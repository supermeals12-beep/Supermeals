/*
  Warnings:

  - You are about to drop the column `name` on the `AdminProfile` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `AdminProfile` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `AdminProfile` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `CustomerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `CustomerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `CustomerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `CustomerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `CustomerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `used` on the `UserOtp` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UserOtp` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `wishlist` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[otpId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."UserOtp" DROP CONSTRAINT "UserOtp_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."subscriptions" DROP CONSTRAINT "subscriptions_userId_fkey";

-- DropIndex
DROP INDEX "public"."UserOtp_userId_idx";

-- DropIndex
DROP INDEX "public"."UserOtp_userId_key";

-- AlterTable
ALTER TABLE "public"."AdminProfile" DROP COLUMN "name",
DROP COLUMN "notes",
DROP COLUMN "phone";

-- AlterTable
ALTER TABLE "public"."CustomerProfile" DROP COLUMN "address",
DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "postalCode",
DROP COLUMN "state";

-- AlterTable
ALTER TABLE "public"."UserOtp" DROP COLUMN "used",
DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "public"."subscriptions" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "password",
ADD COLUMN     "is_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "otpId" TEXT;

-- AlterTable
ALTER TABLE "public"."wishlist" DROP COLUMN "productId";

-- CreateIndex
CREATE UNIQUE INDEX "users_otpId_key" ON "public"."users"("otpId");

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_otpId_fkey" FOREIGN KEY ("otpId") REFERENCES "public"."UserOtp"("id") ON DELETE SET NULL ON UPDATE CASCADE;
