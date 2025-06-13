DROP PROCEDURE IF EXISTS get_inventory_card;

DELIMITER //
CREATE PROCEDURE get_inventory_card(
  IN in_user_id INT, 
  IN in_company_id INT, 
  IN in_inventory_card_id INT
)
BEGIN
  DECLARE message VARCHAR(100) DEFAULT 'Inventory card retrieved';
  DECLARE error_code INT;
  DECLARE result_json JSON;
  DECLARE movements_json JSON;
  
  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
  BEGIN
    SET message = 'An error occurred while retrieving the inventory card';
    SET error_code = -1;
    SET result_json = NULL;
    ROLLBACK;
  END;

  START TRANSACTION;

  -- Movements
  SELECT JSON_ARRAYAGG(
    JSON_OBJECT(
      'id', i_movements.id,
      'movement', m_concepts.name,
      'quantity', i_movements.quantity,
      'stock', i_movements.stock,
      'unit_cost', i_movements.unit_cost,
      'final_balance', i_movements.final_balance,
      'user_id', i_movements.user_id
    )
  )
  INTO movements_json
  FROM inventory_movements i_movements
  JOIN users ON users.id = i_movements.user_id
  JOIN movement_concepts m_concepts ON m_concepts.id = i_movements.movement_concept_id
  WHERE i_movements.inventory_card_id = in_inventory_card_id;

  -- Main query
  SELECT JSON_OBJECT(
    'name', i_cards.name,
    'description', i_cards.description,
    'created_by', users.username,
    'method', i_methods.name,
    'currency', currencies.code,
    'movements', movements_json
  )
  INTO result_json
  FROM inventory_cards i_cards
  JOIN inventory_methods i_methods ON i_methods.id = i_cards.inventory_method_id
  JOIN currencies ON currencies.id = i_cards.currency_id
  JOIN users ON users.id = i_cards.user_id
  JOIN products ON products.id = i_cards.product_id
  WHERE products.company_id = in_company_id
    AND EXISTS (
      SELECT 1 FROM users_companies u_companies
      WHERE u_companies.company_id = i_cards.id AND u_companies.user_id = in_user_id
    )
  LIMIT 1;

  COMMIT;

  SELECT JSON_OBJECT(
    'message', message,
    'result', result_json,
    'error_code', error_code
  ) AS response;
END //
DELIMITER ;
