DROP PROCEDURE IF EXISTS get_products;

DELIMITER //
CREATE PROCEDURE get_products(IN in_company_id INT)
BEGIN
  DECLARE message VARCHAR(100) DEFAULT 'Products retrieved';
  DECLARE error_code INT;
  DECLARE result_json JSON;
  DECLARE inventory_cards_json JSON;
  
  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
  BEGIN
    SET message = 'An error occurred while retrieving the product';
    SET error_code = -1;
    SET result_json = NULL;
    ROLLBACK;
  END;

  START TRANSACTION;

  -- Main product query
  SELECT JSON_ARRAY(
    JSON_OBJECT(
      'id', id,
      'product_name', name
    )
  )
  INTO result_json
  FROM products
  WHERE company_id = in_company_id;

  COMMIT;

  SELECT JSON_OBJECT(
    'message', message,
    'result', result_json,
    'error_code', error_code
  ) AS response;
END //
DELIMITER ;
