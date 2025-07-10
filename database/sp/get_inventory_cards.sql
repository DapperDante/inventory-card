DROP PROCEDURE IF EXISTS get_inventory_cards;

DELIMITER //
CREATE PROCEDURE get_inventory_cards(
  IN in_product_id INT
)
BEGIN
  DECLARE message VARCHAR(100) DEFAULT 'Inventory card retrieved';
  DECLARE error_code INT;
  DECLARE result_json JSON;
  DECLARE movements_json JSON;

  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
  BEGIN
    SET message = 'An error occurred while retrieving the inventory cards';
    SET error_code = -1;
    ROLLBACK;
  END;

  START TRANSACTION;

  -- Main query
  SELECT JSON_ARRAYAGG(
    JSON_OBJECT(
    'id', i_cards.id,
    'product', products.name,
    'name', i_cards.name,
    'description', i_cards.description,
    'created_by', users.username,
    'method', i_methods.name,
    'currency', currencies.code
    )
  )
  INTO result_json
  FROM inventory_cards i_cards
  LEFT JOIN inventory_methods i_methods ON i_methods.id = i_cards.inventory_method_id
  LEFT JOIN currencies ON currencies.id = i_cards.currency_id
  LEFT JOIN users ON users.id = i_cards.user_id
  LEFT JOIN products ON products.id = i_cards.product_id
  LEFT JOIN companies ON companies.id = products.company_id
  WHERE i_cards.product_id = in_product_id;

  COMMIT;

  SELECT JSON_OBJECT(
    'message', message,
    'result', result_json,
    'error_code', error_code
  ) AS response;
END //
DELIMITER ;
