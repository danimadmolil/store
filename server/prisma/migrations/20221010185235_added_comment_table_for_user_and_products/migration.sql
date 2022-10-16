-- CreateTable
CREATE TABLE "CommentsOnProduc" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "commentId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "CommentsOnProduc_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CommentsOnProduc_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "comment" TEXT NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL DEFAULT '',
    "commentsOnProducId" INTEGER NOT NULL DEFAULT -1,
    CONSTRAINT "user_commentsOnProducId_fkey" FOREIGN KEY ("commentsOnProducId") REFERENCES "CommentsOnProduc" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_user" ("email", "id", "name", "password", "refreshToken") SELECT "email", "id", "name", "password", "refreshToken" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_name_key" ON "user"("name");
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
