-- Create database if not exists
CREATE DATABASE IF NOT EXISTS dineHub_dev_db;
-- creating a new user dinehub_dev if not exist
CREATE USER IF NOT EXISTS 'dine_hub_dev'@'localhost' IDENTIFIED BY 'dinehub_dev_pwd';

-- Granting privileges
-- GRANT ALL PRIVILEGES ON dineHub_dev_db.* TO 'dineHub_dev'@'localhost';
GRANT ALL PRIVILEGES ON dineHub_dev_db.* TO 'dine_hub_dev'@'localhost';
GRANT SELECT ON performance_schema.* To 'dine_hub_dev'@'localhost';
FLUSH PRIVILEGES;
