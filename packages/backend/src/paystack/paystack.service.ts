import { Injectable, HttpException } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaystackService {
  private readonly baseUrl = 'https://api.paystack.co';

  constructor(private configService: ConfigService) {}

  private get headers() {
    return {
      Authorization: `Bearer ${this.configService.get<string>('PAYSTACK_SECRET_KEY')}`,
      'Content-Type': 'application/json',
    };
  }

  // 1. Initialize Deposit Transaction
  async initializeTransaction(email: string, amount: number, callback_url: string) {
    try {
      const response = await axios.post(`${this.baseUrl}/transaction/initialize`, {
        email,
        amount: amount * 100, // Paystack uses kobo
        callback_url,
      }, { headers: this.headers });

      return response.data.data;
    } catch (err) {
      throw new HttpException(err.response?.data || 'Paystack error', err.response?.status || 500);
    }
  }

  // 2. Verify Transaction
  async verifyTransaction(reference: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/transaction/verify/${reference}`, {
        headers: this.headers,
      });

      return response.data.data;
    } catch (err) {
      throw new HttpException(err.response?.data || 'Paystack error', err.response?.status || 500);
    }
  }

  // 3. Create Transfer Recipient
  async createTransferRecipient(name: string, account_number: string, bank_code: string) {
    try {
      const response = await axios.post(`${this.baseUrl}/transferrecipient`, {
        type: 'nuban',
        name,
        account_number,
        bank_code,
        currency: 'NGN',
      }, { headers: this.headers });

      return response.data.data;
    } catch (err) {
      throw new HttpException(err.response?.data || 'Paystack error', err.response?.status || 500);
    }
  }

  // 4. Initiate Transfer (Disbursement)
  async initiateTransfer(amount: number, recipient_code: string, reason: string) {
    try {
      const response = await axios.post(`${this.baseUrl}/transfer`, {
        source: 'balance',
        amount: amount * 100,
        recipient: recipient_code,
        reason,
      }, { headers: this.headers });

      return response.data.data;
    } catch (err) {
      throw new HttpException(err.response?.data || 'Paystack error', err.response?.status || 500);
    }
  }
}
