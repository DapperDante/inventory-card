DROP PROCEDURE IF EXISTS add_initial_balance;

DELIMITER //
CREATE PROCEDURE add_initial_balance(
  IN in_user_id INT, 
  IN in_inventory_card_id INT, 
  IN in_quantity INT, 
  IN in_unit_cost DECIMAL(14,2),
  OUT out_new_id INT
)
BEGIN
  DECLARE message VARCHAR(100) DEFAULT 'Initial balance added successfully';
  DECLARE error_code INT;
  DECLARE result_json JSON;
  DECLARE already_exists INT DEFAULT 0;
  
  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
  BEGIN 
    SET message = 'An error occurred while adding the Initial balance to the company';
    SET error_code = -1;
    SET result_json = NULL;
    ROLLBACK;
  END;

  START TRANSACTION;

  SELECT EXISTS (
    SELECT 1 
    FROM inventory_movements 
    WHERE inventory_card_id = in_inventory_card_id
  ) INTO already_exists;

  INSERT INTO inventory_movements(
    inventory_card_id, 
    movement_concept_id,
    user_id,
    quantity,
    unit_cost
  )VALUES(
    in_inventory_card_id, 
    4, 
    in_user_id,
    in_quantity,
    in_unit_cost
  );

  IF already_exists = 1 THEN
    SIGNAL SQLSTATE '45000';
  END IF;

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
