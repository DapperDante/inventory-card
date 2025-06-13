CREATE TABLE users(
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(150) NOT NULL UNIQUE,
  username VARCHAR(65) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  auth_status TINYINT(1) NOT NULL DEFAULT 0,
  inactive TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY(id)
);
CREATE TABLE companies(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  inactive TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY(id)
);
CREATE TABLE users_companies(
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  company_id INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(company_id) REFERENCES companies(id)
);
CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  company_id INT NOT NULL,
  user_id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(255) NOT NULL,
  inactive TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY(id),
  FOREIGN KEY(company_id) REFERENCES companies(id)
);
CREATE TABLE inventory_methods(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL UNIQUE,
  description VARCHAR(255) NOT NULL,
  PRIMARY KEY(id)
);
CREATE TABLE currencies(
  id INT NOT NULL AUTO_INCREMENT,
  code VARCHAR(3) NOT NULL UNIQUE,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY(id)
);
CREATE TABLE inventory_cards(
  id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  user_id INT NOT NULL,
  inventory_method_id INT NOT NULL,
  currency_id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(255) NOT NULL,
  date DATETIME NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(product_id) REFERENCES products(id),
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(inventory_method_id) REFERENCES inventory_methods(id),
  FOREIGN KEY(currency_id) REFERENCES currencies(id)
);
CREATE TABLE movement_concepts(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(255) NOT NULL,
  PRIMARY KEY(id)
);
CREATE TABLE inventory_movements(
  id INT NOT NULL AUTO_INCREMENT,
  inventory_card_id INT NOT NULL,
  movement_concept_id INT NOT NULL,
  user_id INT NOT NULL,
  date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  quantity INT NOT NULL,
  stock INT NOT NULL,
  unit_cost DECIMAL(14,2) NOT NULL,
  final_balance DECIMAL(14,2) NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(inventory_card_id) REFERENCES inventory_cards(id),
  FOREIGN KEY(movement_concept_id) REFERENCES movement_concepts(id),
  FOREIGN KEY(user_id) REFERENCES users(id)
);
CREATE TABLE inventory_averages(
  id INT NOT NULL AUTO_INCREMENT,
  inventory_movement_id INT NOT NULL,
  average_cost DECIMAL(14,2) NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(inventory_movement_id) REFERENCES inventory_movements(id)
);
CREATE TABLE inventory_references(
  id INT NOT NULL AUTO_INCREMENT,
  inventory_card_id INT NOT NULL,
  detail VARCHAR(50) NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(inventory_card_id) REFERENCES inventory_cards(id)
);