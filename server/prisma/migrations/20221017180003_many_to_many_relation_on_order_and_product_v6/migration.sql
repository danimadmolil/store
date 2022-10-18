/*
  Warnings:

  - A unique constraint covering the columns `[orderId,productId]` on the table `ProductOnOrder` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProductOnOrder_orderId_productId_key" ON "ProductOnOrder"("orderId", "productId");
