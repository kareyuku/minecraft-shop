/*
  Warnings:

  - You are about to drop the column `price` on the `PaymentMethod` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PaymentMethod" DROP COLUMN "price",
ADD COLUMN     "fee" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 1;
