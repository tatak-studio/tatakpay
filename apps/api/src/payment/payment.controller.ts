import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('invoice')
  async createInvoice(
    @Body() body: { amount: number; userId: string; email: string },
  ) {
    return this.paymentService.createInvoice(body);
  }

  @Post('webhook')
  async handleWebhook(@Body() body: any) {
    return this.paymentService.handleWebhook(body);
  }
}
