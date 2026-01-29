import { Injectable } from '@nestjs/common';
import Xendit from 'xendit-node';
import type { Invoice } from 'xendit-node/invoice/models';
import { PrismaService } from '../prisma.service';

interface WebhookPayload {
  status?: string;
  external_id?: string;
}

@Injectable()
export class PaymentService {
  private invoice: Xendit['Invoice'];

  constructor(private prisma: PrismaService) {
    const xendit = new Xendit({
      secretKey: process.env.XENDIT_SECRET_KEY ?? '',
    });
    this.invoice = xendit.Invoice;
  }

  verifyWebhook(token: string): boolean {
    const webhookToken = process.env.XENDIT_WEBHOOK_TOKEN;
    if (!webhookToken) {
      console.warn('XENDIT_WEBHOOK_TOKEN is not set, skipping verification');
      return true; // Allow for dev/testing if token not set, but warn
    }
    return token === webhookToken;
  }

  async createInvoice(data: { amount: number; userId: string; email: string }) {
    const { amount, userId, email } = data;

    // Check if user exists first
    let user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    // If not found by ID, try finding by email
    if (!user) {
      user = await this.prisma.user.findUnique({
        where: { email },
      });
    }

    // If still not found, create a new user
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email,
          // If the provided userId is not in our system, we let Prisma generate a new UUID
          // or we could opt to use the provided one if it's safe.
          // For safety and consistency, we'll generate a new one (default behavior)
          // unless specific requirements dictate otherwise.
          // However, if the caller sent specific ID they might expect it.
          // But usually 'userId' from frontend for guest might be junk.
          // Let's rely on email as the "identity".
          role: 'customer',
        },
      });
    }

    // Use the resolved user's ID
    const validUserId = user.id;

    const externalId = `invoice-${validUserId}-${Date.now()}`;

    try {
      const response: Invoice = await this.invoice.createInvoice({
        data: {
          externalId,
          amount,
          payerEmail: email,
          description: `Payment for User ${validUserId}`,
          currency: 'PHP',
        },
      });

      // Save to database
      const payment = await this.prisma.payment.create({
        data: {
          xenditInvoiceId: response.id ?? '',
          externalId: response.externalId,
          amount: response.amount,
          currency: response.currency ?? 'PHP',
          status: response.status,
          description: response.description ?? null,
          paymentUrl: response.invoiceUrl,
          userId: validUserId,
        },
      });

      return payment;
    } catch (error) {
      console.error('Xendit Invoice Error:', error);
      throw error;
    }
  }

  async handleWebhook(payload: WebhookPayload, token: string) {
    if (!this.verifyWebhook(token)) {
      throw new Error('Invalid webhook token');
    }

    // Implement webhook handling to update payment status
    console.log('Webhook received:', payload);
    // Logic to find payment by externalId or xenditInvoiceId and update status
    if (payload.status && payload.external_id) {
      await this.prisma.payment.update({
        where: { externalId: payload.external_id },
        data: { status: payload.status, updatedAt: new Date() },
      });
    }
    return { status: 'ok' };
  }

  async getPaymentsByUser(userId: string) {
    return this.prisma.payment.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAllPayments() {
    return this.prisma.payment.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { email: true } } }, // Include user email for admin view
    });
  }

  async getPaymentsByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return [];
    }

    return this.prisma.payment.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });
  }
}
