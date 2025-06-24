DROP PROCEDURE IF EXISTS get_balance;
DELIMITER //
CREATE PROCEDURE get_balance(IN in_inventory_card INT)
BEGIN
    DECLARE message VARCHAR(255) DEFAULT 'balance retrieved successfully';
    DECLARE result_json JSON;
    DECLARE error_code INT;

    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    BEGIN
        SET message = 'error retrieving balance';
        SET error_code = -1;
    END;

    SELECT JSON_ARRAYAGG(
      JSON_OBJECT(
        'available_stock', available_stock,
        'unit_cost', unit_cost,
        'total_cost', (available_stock * unit_cost)
      )
    )
    INTO result_json  
    FROM purchase_view 
    WHERE inventory_card_id = in_inventory_card
    AND available_stock > 0;

    SELECT JSON_OBJECT(
      'message', message,
      'error_code', error_code,
      'result', result_json
    ) AS response;
END //
DELIMITER ;