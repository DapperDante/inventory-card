DROP PROCEDURE IF EXISTS purchase_return;

DELIMITER //
CREATE PROCEDURE purchase_return(
  IN in_user_id INT, 
  IN in_inventory_card_id INT, 
  IN in_quantity INT,
  OUT out_new_id INT
)
BEGIN
  DECLARE message VARCHAR(100) DEFAULT 'Return added to the inventory card successfully';
  DECLARE error_code INT;
  DECLARE result_json JSON;
  DECLARE last_stock INT;
  DECLARE last_final_balance DECIMAL(14,2);
  
  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
  BEGIN
    SET message = 'An error occurred while adding the purchase return to the inventory card';
    SET error_code = -1;
    SET result_json = NULL;
    ROLLBACK;
  END;

  START TRANSACTION;

  SELECT i_movements.stock, i_movements.final_balance
  INTO last_stock, last_final_balance
  FROM inventory_movements i_movements
  WHERE i_movements.inventory_card_id = in_inventory_card_id 
  ORDER BY i_movements.id DESC
  LIMIT 1; b
  
  SET last_stock = IFNULL(last_stock, 0) + in_quantity;
  SET last_final_balance = IFNULL(last_final_balance, 0) + (in_quantity * in_unit_cost);

  INSERT INTO inventory_movements(
    inventory_card_id, 
    movement_concept_id, 
    user_id,
    quantity, 
    stock,
    unit_cost,
    final_balance
  )VALUES(
    in_inventory_card_id, 
    1, 
    in_user_id,
    in_quantity, 
    last_stock,
    in_unit_cost,
    last_final_balance
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
