import { IsEmail, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateInvoiceDto {
  @IsNumber()
  @Min(1, { message: 'Amount must be at least 1' })
  amount: number;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
