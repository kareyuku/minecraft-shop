/*
  Warnings:

  - A unique constraint covering the columns `[ip]` on the table `Server` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Server_ip_key" ON "Server"("ip");
