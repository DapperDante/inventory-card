DROP PROCEDURE IF EXISTS add_inventory_card;

DELIMITER //
CREATE PROCEDURE add_inventory_card(
  in in_product_id INT, 
  in in_inventory_method_id INT,
  in in_name VARCHAR(50), 
  in in_description VARCHAR(255), 
  in in_date DATETIME
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
    inventory_method_id, 
    name, 
    description, 
    date
  )
  VALUES(
    in_product_id, 
    in_inventory_method_id, 
    in_name, 
    in_description, 
    in_date
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
