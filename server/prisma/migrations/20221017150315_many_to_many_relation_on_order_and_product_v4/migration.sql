-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL DEFAULT '',
    "commentsOnProducId" INTEGER DEFAULT -1,
    CONSTRAINT "user_commentsOnProducId_fkey" FOREIGN KEY ("commentsOnProducId") REFERENCES "CommentsOnProduc" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_user" ("commentsOnProducId", "email", "id", "name", "password", "refreshToken") SELECT "commentsOnProducId", "email", "id", "name", "password", "refreshToken" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_name_key" ON "user"("name");
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
