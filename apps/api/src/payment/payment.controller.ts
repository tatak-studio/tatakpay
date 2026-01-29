import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

interface WebhookPayload {
  status?: string;
  external_id?: string;
}

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('user/:userId')
  async getPaymentsByUser(@Param('userId') userId: string) {
    return this.paymentService.getPaymentsByUser(userId);
  }

  @Get()
  async getAllPayments() {
    return this.paymentService.getAllPayments();
  }

  @Get('email/:email')
  async getPaymentsByEmail(@Param('email') email: string) {
    return this.paymentService.getPaymentsByEmail(email);
  }

  @Post('invoice')
  async createInvoice(
    @Body() body: { amount: number; userId: string; email: string },
  ) {
    return this.paymentService.createInvoice(body);
  }

  @Post('webhook')
  async handleWebhook(
    @Body() body: WebhookPayload,
    @Headers('x-callback-token') token: string,
  ) {
    return this.paymentService.handleWebhook(body, token);
  }
}
