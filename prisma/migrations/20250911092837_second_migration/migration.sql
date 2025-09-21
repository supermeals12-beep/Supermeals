/*
  Warnings:

  - You are about to alter the column `pricePerDay` on the `subscriptions` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - Added the required column `description` to the `subscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscriptionName` to the `subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."subscriptions" DROP CONSTRAINT "subscriptions_userId_fkey";

-- AlterTable
ALTER TABLE "public"."subscriptions" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "subscriptionName" TEXT NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "pricePerDay" SET DATA TYPE DECIMAL(10,2);

-- AddForeignKey
ALTER TABLE "public"."subscriptions" ADD CONSTRAINT "subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
