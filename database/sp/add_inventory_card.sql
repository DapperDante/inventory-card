DROP PROCEDURE IF EXISTS add_inventory_card;

DELIMITER //
CREATE PROCEDURE add_inventory_card(
  IN in_user_id INT,
  IN in_product_id INT, 
  IN in_inventory_method_id INT,
  IN in_currency_id INT,
  IN in_name VARCHAR(50),
  IN in_description VARCHAR(255), 
  IN in_date DATETIME
)
BEGIN
  DECLARE message VARCHAR(100) DEFAULT 'Inventory card added';
  DECLARE error_code INT;
  DECLARE result_json JSON;
  
  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
  BEGIN
    SET message = 'An error occurred while adding the inventory card';
    SET error_code = -1;
    SET result_json = NULL;
    ROLLBACK;
  END;

  START TRANSACTION;

  INSERT INTO inventory_cards(
    product_id, 
    user_id,
    inventory_method_id, 
    name, 
    description, 
    date,
    currency_id
  )
  VALUES(
    in_product_id,
    in_user_id,
    in_inventory_method_id,
    in_name,
    in_description,
    in_date,
    in_currency_id
  );

  IF error_code IS NULL THEN
    SET result_json = JSON_OBJECT(
      'id', LAST_INSERT_ID()
    ); 
  END IF;
  
  COMMIT;

  SELECT JSON_OBJECT(
    'message', message,
    'result', result_json,
    'error_code', error_code
  ) AS response;
END //
DELIMITER ;
