DROP PROCEDURE IF EXISTS get_company;

DELIMITER //
CREATE PROCEDURE get_company(IN in_company_id INT)
BEGIN
  DECLARE message VARCHAR(100) DEFAULT 'Company retrieved';
  DECLARE error_code INT;
  DECLARE result_json JSON;
  DECLARE users_json JSON;
  DECLARE products_json JSON;
  
  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
  BEGIN 
    SET message = 'An error occurred while retrieving the company';
    SET error_code = -1;
    SET result_json = NULL;
    ROLLBACK;
  END;

  START TRANSACTION;

  -- Users
  SELECT JSON_ARRAYAGG(
    JSON_OBJECT(
      'username', users.username
    )
  )
  INTO users_json
  FROM users_companies
  JOIN users ON users.id = users_companies.user_id
  WHERE users_companies.company_id = in_company_id;

  -- Products
  SELECT JSON_ARRAYAGG(
    JSON_OBJECT(
      'product_id', products.id,
      'name', products.name,
      'description', products.description
    )
  )
  INTO products_json
  FROM products
  WHERE products.company_id = in_company_id;

  -- Main company query
  SELECT JSON_OBJECT(
    'company_id', c.id,
    'company_name', c.name,
    'users', users_json,
    'products', products_json
  )
  INTO result_json
  FROM companies 
  WHERE companies.id = in_company_id;

  COMMIT;

  SELECT JSON_OBJECT(
    'message', message,
    'result', result_json,
    'error_code', error_code
  ) AS response;
END //
DELIMITER ;
