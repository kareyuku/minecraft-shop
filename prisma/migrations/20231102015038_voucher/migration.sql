-- CreateTable
CREATE TABLE "Voucher" (
    "id" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Voucher_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
