import { Injectable } from '@nestjs/common';
import Xendit from 'xendit-node';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PaymentService {
  private xendit: any; // Using any to avoid type issues for now, we can refine later
  private invoice: any;

  constructor(private prisma: PrismaService) {
    this.xendit = new Xendit({
      secretKey: process.env.XENDIT_SECRET_KEY || 'xnd_development_dummy',
    });
    this.invoice = new this.xendit.Invoice();
  }

  async createInvoice(data: { amount: number; userId: string; email: string }) {
    const { amount, userId, email } = data;
    const externalId = `invoice-${userId}-${Date.now()}`;

    try {
      const response = await this.invoice.createInvoice({
        externalID: externalId,
        amount,
        payerEmail: email,
        description: `Payment for User ${userId}`,
        currency: 'PHP',
      });

      // Save to database
      const payment = await this.prisma.payment.create({
        data: {
          xenditInvoiceId: response.id,
          externalId: response.external_id,
          amount: response.amount,
          currency: response.currency,
          status: response.status,
          description: response.description,
          paymentUrl: response.invoice_url,
          userId,
        },
      });

      return payment;
    } catch (error) {
      console.error('Xendit Invoice Error:', error);
      throw error;
    }
  }

  async handleWebhook(data: any) {
    // Implement webhook handling to update payment status
    console.log('Webhook received:', data);
    // Logic to find payment by externalId or xenditInvoiceId and update status
    if (data.status && data.external_id) {
      await this.prisma.payment.update({
        where: { externalId: data.external_id },
        data: { status: data.status, updatedAt: new Date() },
      });
    }
    return { status: 'ok' };
  }
}
