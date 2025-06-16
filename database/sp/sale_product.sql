DROP PROCEDURE IF EXISTS sale_product;

DELIMITER //
CREATE PROCEDURE sale_product(
  IN in_user_id INT,
  IN in_inventory_card_id INT,
  IN in_quantity INT,
  OUT out_new_id INT
)
BEGIN
  DECLARE message VARCHAR(100) DEFAULT 'User product to company';
  DECLARE error_code INT;
  DECLARE result_json JSON;
  DECLARE method_id INT;
  DECLARE movement_source JSON;
  
  -- DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
  -- BEGIN
  --   SET message = 'An error occurred while adding the sale product to the inventory card';
  --   SET error_code = -1;
  --   SET result_json = NULL;
  --   ROLLBACK;
  -- END;

  START TRANSACTION;

  SELECT inventory_method_id
  INTO method_id
  FROM inventory_cards
  WHERE id = in_inventory_card_id;

  IF method_id = 1 THEN
    -- FIFO Method
    CALL find_movement_source_fifo(in_inventory_card_id, in_quantity, movement_source);
  ELSEIF method_id = 2 THEN
    -- LIFO Method
    CALL find_movement_source_lifo(in_inventory_card_id, in_quantity, movement_source);
  END IF;

  INSERT INTO inventory_movements(
    inventory_card_id, 
    movement_concept_id,
    related_movement_id,
    user_id,
    quantity
  )
  SELECT
    2,
    2,
    jt.id,
    3,
    jt.to_sell
  FROM JSON_TABLE(
    movement_source,
    '$[*]' COLUMNS (
      id INT PATH '$.id',
      to_sell INT PATH '$.to_sell'
    )
  ) AS jt;

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
