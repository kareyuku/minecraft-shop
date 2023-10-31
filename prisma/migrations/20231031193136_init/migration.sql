-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('PLN', 'USD', 'EUR');

-- CreateEnum
CREATE TYPE "PaymentProvider" AS ENUM ('STRIPE', 'PRZELEWY24', 'PAYPAL', 'BLIK', 'HOTPAY_TRANFER', 'HOTPAY_PAYSAFECARD', 'HOTPAY_SMS', 'PAYBYLINK_TRANFER', 'PAYBYLINK_PAYSAFECARD', 'PAYBYLINK_SMS');

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "id" SERIAL NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "provider" "PaymentProvider" NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT 'PLN',
    "productId" INTEGER NOT NULL,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "imageUri" TEXT,
    "requireOnline" BOOLEAN NOT NULL DEFAULT false,
    "minimumBuy" INTEGER,
    "maximumBuy" INTEGER,
    "serverId" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Server" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "imageUri" TEXT,

    CONSTRAINT "Server_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PaymentMethod" ADD CONSTRAINT "PaymentMethod_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
