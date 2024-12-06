/*
  Warnings:

  - Added the required column `cepDestino` to the `Compra` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `compra` ADD COLUMN `cepDestino` VARCHAR(191) NOT NULL;
