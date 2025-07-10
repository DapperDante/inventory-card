DROP PROCEDURE IF EXISTS production_required;

DELIMITER //
CREATE PROCEDURE production_required(
  IN in_user_id INT, 
  IN in_inventory_card_id INT, 
  IN in_quantity INT
)
BEGIN
  DECLARE message VARCHAR(100) DEFAULT 'production required to the inventory card successfully';
  DECLARE error_code INT;
  DECLARE result_json JSON;
  DECLARE method_id INT;
  DECLARE movement_source JSON;
  
  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
  BEGIN
    SET message = 'An error occurred while adding the production required to the inventory card';
    SET error_code = -1;
    SET result_json = NULL;
    ROLLBACK;
  END;

  START TRANSACTION;

  SELECT inventory_method_id
  INTO method_id
  FROM inventory_cards
  WHERE id = in_inventory_card_id;

  IF method_id = 1 THEN
    CALL find_purchase_for_sale_fifo(in_inventory_card_id, in_quantity, movement_source);
  ELSEIF method_id = 2 THEN
    CALL find_purchase_for_sale_lifo(in_inventory_card_id, in_quantity, movement_source);
  END IF;

  INSERT INTO inventory_movements(
    inventory_card_id, 
    movement_concept_id,
    related_movement_id,
    user_id,
    quantity
  )
  SELECT
    in_inventory_card_id,
    6,
    jt.id,
    in_user_id,
    jt.to_sell
  FROM JSON_TABLE(
    movement_source,
    '$[*]' COLUMNS (
      id INT PATH '$.id',
      to_sell INT PATH '$.to_sell'
    )
  ) AS jt;

  IF movement_source IS NULL THEN
    SIGNAL SQLSTATE '45000';
  END IF;

  COMMIT;

  SELECT JSON_OBJECT(
    'message', message,
    'result', result_json,
    'error_code', error_code
  ) AS response;
END //
DELIMITER ;
