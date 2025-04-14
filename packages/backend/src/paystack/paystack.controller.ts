import { Controller, Post, Body, Query, Header, Req } from '@nestjs/common';
import { PaystackService } from './paystack.service';

@Controller('paystack')
export class PaystackController {
    constructor(private paystackService: PaystackService) { }

    @Post('initialize')
    initialize(@Body() body: { email: string; amount: number; callback_url: string }) {
        return this.paystackService.initializeTransaction(body.email, body.amount, body.callback_url);
    }

    @Post('verify')
    verify(@Query('reference') reference: string) {
        return this.paystackService.verifyTransaction(reference);
    }

    @Post('recipient')
    createRecipient(@Body() body: { name: string; account_number: string; bank_code: string }) {
        return this.paystackService.createTransferRecipient(body.name, body.account_number, body.bank_code);
    }

    @Post('transfer')
    transfer(@Body() body: { amount: number; recipient_code: string; reason: string }) {
        return this.paystackService.initiateTransfer(body.amount, body.recipient_code, body.reason);
    }

    @Post('webhook')
    @Header('Content-Type', 'application/json')
    handleWebhook(@Req() req: Request) {
        const event = req.body;
        // validate event.signature
        // handle events like 'charge.success'
        console.log('Webhook received:', event);
    }

}
