// Notification.module.ts
import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { NotificationsController } from './notifications.controller';

@Module({
  providers: [FirebaseService],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
