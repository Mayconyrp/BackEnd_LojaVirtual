/*
  Warnings:

  - Added the required column `cep` to the `Endereco` table without a default value. This is not possible if the table is not empty.
  - Added the required column `complemento` to the `Endereco` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `endereco` ADD COLUMN `cep` VARCHAR(191) NOT NULL,
    ADD COLUMN `complemento` VARCHAR(191) NOT NULL,
    MODIFY `numero` VARCHAR(191) NOT NULL;
