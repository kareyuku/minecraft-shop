-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('PLN', 'USD', 'EUR');

-- CreateEnum
CREATE TYPE "PaymentProvider" AS ENUM ('STRIPE', 'PRZELEWY24', 'PAYPAL', 'BLIK', 'HOTPAY_TRANFER', 'HOTPAY_PAYSAFECARD', 'HOTPAY_SMS', 'PAYBYLINK_TRANFER', 'PAYBYLINK_PAYSAFECARD', 'PAYBYLINK_SMS');

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "id" SERIAL NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "provider" "PaymentProvider" NOT NULL,
    "currency" "Currency" DEFAULT 'PLN',

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("id")
);
