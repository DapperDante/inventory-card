DROP PROCEDURE IF EXISTS get_product;

DELIMITER //
CREATE PROCEDURE get_product(IN in_company_id INT, IN in_product_id INT)
BEGIN
  DECLARE message VARCHAR(100) DEFAULT 'Product retrieved';
  DECLARE error_code INT;
  DECLARE result_json JSON;
  DECLARE inventory_cards_json JSON;
  
  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
  BEGIN
    SET message = 'An error occurred while retrieving the product';
    SET error_code = -1;
    SET result_json = NULL;
    ROLLBACK;
  END;

  START TRANSACTION;

  -- Inventory cards
  SELECT JSON_ARRAYAGG(
    JSON_OBJECT(
      'id', i_cards.id,
      'inventory_method', inventory_methods.name,
      'name', i_cards.name,
      'description', i_cards.description,
      'date', i_cards.date
    )
  ) INTO inventory_cards_json
  FROM inventory_cards i_cards
  JOIN inventory_methods ON inventory_methods.id = i_cards.inventory_method_id
  WHERE i_cards.product_id = in_product_id;

  -- Main product query
  SELECT JSON_OBJECT(
    'product_name', products.name,
    'inventory_cards', inventory_cards_json
  )
  INTO result_json
  FROM products
  WHERE products.id = in_product_id;

  COMMIT;

  SELECT JSON_OBJECT(
    'message', message,
    'result', result_json,
    'error_code', error_code
  ) AS response;
END //
DELIMITER ;
