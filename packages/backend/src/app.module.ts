import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaystackService } from './paystack/paystack.service';
import { PaystackController } from './paystack/paystack.controller';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
  ],
  controllers: [AppController, PaystackController],
  providers: [AppService, PaystackService],
})
export class AppModule {}
