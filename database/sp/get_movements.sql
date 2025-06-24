DROP PROCEDURE IF EXISTS get_movements;

DELIMITER //
CREATE PROCEDURE get_movements(IN in_inventory_card_id INT)
BEGIN 
  DECLARE message VARCHAR(100) DEFAULT 'Movements retrieved';
  DECLARE error_code INT;
  DECLARE result_json JSON;

  DECLARE CONTINUE HANDLER FOR NOT FOUND
  BEGIN
    SET message = 'No movements found for this inventory card';
    SET error_code = 1329;
  END;

  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
  BEGIN
    SET message = 'An error occurred while retrieving the movements';
    SET error_code = -1;
    SET result_json = NULL;
    ROLLBACK;
  END;

  START TRANSACTION;

  -- Main movements query
  SELECT JSON_ARRAYAGG(
    JSON_OBJECT(
      'id', movements.id,
      'date', movements.date,
      'movement_concept', movements.movement_concept_name,
      'created_by', movements.created_by,
      'quantity', movements.quantity,
      'unit_cost', movements.unit_cost,
      'stock', movements.stock,
      'final_balance', movements.final_balance
    )
  ) INTO result_json
  FROM movement_view movements
  WHERE movements.inventory_card_id = in_inventory_card_id
  ORDER BY movements.id ASC;

  COMMIT;

  SELECT JSON_OBJECT(
    'message', message,
    'result', result_json,
    'error_code', error_code
  ) AS response;
END //
DELIMITER ;