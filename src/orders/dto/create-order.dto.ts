// src/order/dto/create-order.dto.ts
import {
    IsString,
    IsOptional,
    IsUUID,
    IsDateString,
    IsNumber,
    IsEnum,
    IsInt,
} from 'class-validator';
import {
    OrderStatus,
    PaymentStatus,
    PaymentMethod,
} from '@prisma/client';

export class CreateOrderDto {
    @IsString()
    orderNumber: string;

    @IsDateString()
    validFrom: Date;

    @IsOptional()
    @IsDateString()
    validTill?: Date;

    @IsNumber()
    totalPrice: number;

    @IsOptional()
    @IsString()
    trackingId?: string;

    @IsOptional()
    @IsEnum(OrderStatus)
    status?: OrderStatus;

    @IsOptional()
    @IsEnum(PaymentStatus)
    paymentStatus?: PaymentStatus;

    @IsOptional()
    @IsEnum(PaymentMethod)
    paymentMethod?: PaymentMethod;

    @IsOptional()
    @IsUUID()
    shippingAddressId?: string;

    @IsOptional()
    @IsUUID()
    customerProfileId?: string;

    @IsOptional()
    @IsUUID()
    subscriptionId?: string;

    @IsOptional()
    @IsString()
    notes?: string;

    @IsOptional()
    @IsInt()
    quantity?: number;
}
