DROP PROCEDURE IF EXISTS find_movement_source_fifo;

DELIMITER //
CREATE PROCEDURE find_movement_source_fifo(
  IN in_inventory_card_id INT,
  IN in_quantity INT,
  OUT out_source_id JSON
)
BEGIN
  DECLARE total_available_stock INT;

  -- Calculate the total available stock for the inventory card
  SELECT SUM(available_stock)
    INTO total_available_stock
    FROM purchase_view
    WHERE inventory_card_id = in_inventory_card_id
      AND available_stock > 0;
      
  IF total_available_stock >= in_quantity THEN
    WITH RECURSIVE ordered_stock AS (
      SELECT id, inventory_card_id, available_stock
        FROM purchase_view
        WHERE inventory_card_id = in_inventory_card_id
          AND available_stock > 0
    ),
    stock_cte AS (
      -- Anchor part: row with the lowest id (FIFO)
      SELECT
        id,
        inventory_card_id,
        available_stock,
        LEAST(available_stock, in_quantity) AS to_sell,
        in_quantity - LEAST(available_stock, in_quantity) AS remaining
      FROM ordered_stock
      WHERE id = (SELECT MIN(id) FROM ordered_stock)

      UNION ALL

      -- Recursive part: consume the next row with a higher id
      SELECT
        os.id,
        os.inventory_card_id,
        os.available_stock,
        LEAST(os.available_stock, sc.remaining) AS to_sell,
        sc.remaining - LEAST(os.available_stock, sc.remaining) AS remaining
      FROM ordered_stock os
      JOIN stock_cte sc ON os.id = (
        SELECT MIN(id) FROM ordered_stock WHERE id > sc.id
      )
      WHERE sc.remaining > 0
    )
    SELECT JSON_ARRAYAGG(
      JSON_OBJECT(
        'id', id,
        'to_sell', to_sell
      )
    )
    INTO out_source_id
    FROM stock_cte
    WHERE to_sell > 0;
  ELSE
    SET out_source_id = NULL;
  END IF;
END //
DELIMITER ;