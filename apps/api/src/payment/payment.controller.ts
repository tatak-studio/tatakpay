import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiKeyGuard } from '../common/guards/api-key.guard';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { PaymentService } from './payment.service';

interface WebhookPayload {
  status?: string;
  external_id?: string;
}

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('user/:userId')
  @UseGuards(ApiKeyGuard)
  async getPaymentsByUser(@Param('userId') userId: string) {
    return this.paymentService.getPaymentsByUser(userId);
  }

  @Get()
  @UseGuards(ApiKeyGuard)
  async getAllPayments() {
    return this.paymentService.getAllPayments();
  }

  @Get('email/:email')
  @UseGuards(ApiKeyGuard)
  async getPaymentsByEmail(@Param('email') email: string) {
    return this.paymentService.getPaymentsByEmail(email);
  }

  @Post('invoice')
  async createInvoice(@Body() body: CreateInvoiceDto) {
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
