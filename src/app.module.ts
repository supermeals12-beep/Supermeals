import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Subscription } from 'rxjs';
import { SubscriptionModule } from './subscription/subscription.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { ConfigModule } from '@nestjs/config';
import { MessModule } from './mess/mess.module';
import { OrderModule } from './orders/orders.module';
import { WeeklyMenuModule } from './meals/weekly-menu.module';
import { NotificationsModule } from './firebase/notifications.module';
import { OtpModule } from './otp/otp.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',       // your SMTP host
        port: 587,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
      defaults: {
        from: '"No Reply" <no-wishyougrowth@gmail.com>',
      },
    }),
    CartModule,
    AuthModule,
    UsersModule,
    SubscriptionModule,
    CartModule,
    WishlistModule,
    MessModule,
    OrderModule,
    WeeklyMenuModule,
    NotificationsModule,
    OtpModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
