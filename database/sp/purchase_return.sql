DROP PROCEDURE IF EXISTS purchase_return;

DELIMITER //
CREATE PROCEDURE purchase_return(
  IN in_user_id INT, 
  IN in_inventory_card_id INT, 
  IN in_quantity INT
)
BEGIN
  DECLARE message VARCHAR(100) DEFAULT 'Return added to the inventory card successfully';
  DECLARE error_code INT;
  DECLARE result_json JSON;
  DECLARE method_id INT;
  DECLARE movement_source JSON;
  
  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
  BEGIN
    SET message = 'An error occurred while adding the purchase return to the inventory card';
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
    -- FIFO Method
    CALL find_purchase_for_sale_fifo(in_inventory_card_id, in_quantity, movement_source);
  ELSEIF method_id = 2 THEN
    -- LIFO Method
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
    3,
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

  IF error_code IS NULL THEN
    SELECT JSON_OBJECT(
      'id', LAST_INSERT_ID()
    ) INTO result_json;
  END IF;

  COMMIT;

  SELECT JSON_OBJECT(
    'message', message,
    'result', result_json,
    'error_code', error_code
  ) AS response;
END //
DELIMITER ;
