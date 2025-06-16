DROP PROCEDURE IF EXISTS purchase_product;

DELIMITER //
CREATE PROCEDURE purchase_product(
  IN in_user_id INT, 
  IN in_inventory_card_id INT, 
  IN in_quantity INT, 
  IN in_unit_cost DECIMAL(14,2),
  OUT out_new_id INT
)
BEGIN
  DECLARE message VARCHAR(100) DEFAULT 'User product to company';
  DECLARE error_code INT;
  DECLARE result_json JSON;
  
  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
  BEGIN 
    SET message = 'An error occurred while adding the purchase product to the inventory card';
    SET error_code = -1;
    SET result_json = NULL;
    ROLLBACK;
  END;

  START TRANSACTION;

  INSERT INTO inventory_movements(
    inventory_card_id, 
    movement_concept_id,
    user_id,
    quantity,
    unit_cost
  )VALUES(
    in_inventory_card_id, 
    1, 
    in_user_id,
    in_quantity,
    in_unit_cost
  );
  IF error_code IS NULL THEN
    SET out_new_id = LAST_INSERT_ID();
  END IF;

  COMMIT;

  SELECT JSON_OBJECT(
    'message', message,
    'result', result_json,
    'error_code', error_code
  ) AS response;
END //
DELIMITER ;
