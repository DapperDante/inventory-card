DROP PROCEDURE IF EXISTS add_product;

DELIMITER //
CREATE PROCEDURE add_product(IN in_user_id INT, IN in_company_id INT, IN in_name VARCHAR(50), IN in_description VARCHAR(255))
BEGIN
  DECLARE message VARCHAR(100) DEFAULT 'Product added successfully';
  DECLARE error_code INT;
  DECLARE result_json JSON;
  
  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
  BEGIN 
    SET message = 'An error occurred while adding the product';
    SET error_code = -1;
    SET result_json = NULL;
    ROLLBACK;
  END;

  START TRANSACTION;

  INSERT INTO products(company_id, name, description, user_id)
  VALUES(in_company_id, in_name, in_description, in_user_id);
  
  COMMIT;

  SELECT JSON_OBJECT(
    'message', message,
    'result', result_json,
    'error_code', error_code
  ) AS response;
END //
DELIMITER ;
