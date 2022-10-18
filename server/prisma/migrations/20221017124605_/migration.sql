/*
  Warnings:

  - A unique constraint covering the columns `[id,productId]` on the table `ProductOnOrder` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProductOnOrder_id_productId_key" ON "ProductOnOrder"("id", "productId");
