DROP PROCEDURE IF EXISTS add_movement;

DELIMITER //
CREATE PROCEDURE add_movement(
  IN in_user_id INT, 
  IN in_inventory_card_id INT, 
  IN in_concept_id INT,
  IN in_quantity INT, 
  IN in_unit_cost DECIMAL(14,2)
)
BEGIN
  DECLARE message VARCHAR(100) DEFAULT 'Movement added successfully';
  DECLARE error_code INT;
  DECLARE result_json JSON;
  DECLARE new_id INT;
  
  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
  BEGIN 
    SET message = 'An error occurred while adding the movement';
    SET error_code = -1;
    SET result_json = NULL;
    ROLLBACK;
  END;

  START TRANSACTION;

  CASE
    WHEN in_concept_id = 1 THEN 
      CALL purchase_product(in_user_id, in_inventory_card_id, in_quantity, in_unit_cost, new_id);
    WHEN in_concept_id = 4 THEN
      CALL add_initial_balance(in_user_id, in_inventory_card_id, in_quantity, in_unit_cost, new_id);
    ELSE
      SIGNAL SQLSTATE '45000';
  END CASE;

  IF new_id IS NULL THEN
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
