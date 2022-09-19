-- CreateTable
CREATE TABLE "HotOffers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "offPercent" TEXT NOT NULL,
    "expiresOn" DATETIME NOT NULL,
    "title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "HotOffersOnProduct" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "hotOffersId" INTEGER NOT NULL,
    CONSTRAINT "HotOffersOnProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "HotOffersOnProduct_hotOffersId_fkey" FOREIGN KEY ("hotOffersId") REFERENCES "HotOffers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
