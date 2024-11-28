-- AlterTable
ALTER TABLE `compra` ADD COLUMN `empresaFrete` VARCHAR(191) NULL,
    ADD COLUMN `logoTransportadora` VARCHAR(191) NULL,
    ADD COLUMN `nomeTransportadora` VARCHAR(191) NULL,
    ADD COLUMN `precoFrete` DOUBLE NULL,
    ADD COLUMN `tempoEntrega` VARCHAR(191) NULL;
