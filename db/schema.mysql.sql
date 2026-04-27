-- MySQL 8+ schema for MySQL Workbench

CREATE DATABASE IF NOT EXISTS dzencode
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE dzencode;

CREATE TABLE IF NOT EXISTS receipts (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  title TEXT NOT NULL,
  receipt_date DATE NOT NULL,
  amount_usd DECIMAL(12, 2) NULL,
  amount_uah DECIMAL(12, 2) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS receipt_products (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  receipt_id BIGINT UNSIGNED NOT NULL,
  title TEXT NOT NULL,
  serial_number TEXT NOT NULL,
  specification TEXT NOT NULL,
  status TEXT NOT NULL,
  receipt_date DATE NOT NULL,
  guarantee_until DATE NOT NULL,
  price_usd DECIMAL(12, 2) NULL,
  price_uah DECIMAL(12, 2) NULL,
  group_name TEXT NULL,
  seller TEXT NULL,
  owner TEXT NULL,
  arrival_date DATE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY receipt_products_receipt_id_idx (receipt_id),
  KEY receipt_products_status_idx (status(191)),
  KEY receipt_products_specification_idx (specification(191)),
  CONSTRAINT receipt_products_receipt_fk
    FOREIGN KEY (receipt_id)
    REFERENCES receipts(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;
