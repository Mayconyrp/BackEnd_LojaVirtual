/*
  Warnings:

  - You are about to drop the column `tamanho` on the `produto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `produto` DROP COLUMN `tamanho`,
    ADD COLUMN `height` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `length` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `weight` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `width` INTEGER NOT NULL DEFAULT 0;
