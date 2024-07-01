-- setting up test user and database
CREATE DATABASE IF NOT EXISTS dine_hub_test_db;

-- create test user
CREATE USER IF NOT EXISTS 'dine_hub_test'@'localhost' IDENTIFIED BY 'dine_hub_test_pwd';

-- grant privileges on test database
GRANT ALL PRIVILEGES ON dine_hub_test_db.* TO 'dine_hub_test'@'localhost';

-- grant privileges on performance schema
GRANT SELECT ON performance_schema.* TO 'dine_hub_test'@'localhost';