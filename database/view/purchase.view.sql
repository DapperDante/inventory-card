CREATE OR REPLACE VIEW purchase_view AS
SELECT
  i_movements.id,
  i_movements.inventory_card_id,
  i_movements.date,
  m_concepts.name AS movement_concept_name,
  users.username AS created_by,
  i_movements.quantity,
  i_movements.unit_cost,
  (i_movements.quantity 
  -- credit movements
  - IFNULL(SUM(p_return_view.quantity), 0)
  - IFNULL(SUM(s_view.available_stock), 0)
  - IFNULL(SUM(prod_req_view.available_stock), 0)
  ) AS available_stock
FROM inventory_movements i_movements
LEFT JOIN movement_concepts m_concepts ON i_movements.movement_concept_id = m_concepts.id
LEFT JOIN users ON users.id = i_movements.user_id
LEFT JOIN movement_references m_references ON i_movements.id = m_references.inventory_movement_id
-- Auxiliary views for stock adjustments
LEFT JOIN production_require_view prod_req_view ON i_movements.id = prod_req_view.parent_id
LEFT JOIN sale_view s_view ON s_view.parent_id = i_movements.id
LEFT JOIN purchase_return_view p_return_view ON p_return_view.parent_id = i_movements.id
-- Debit movements
WHERE i_movements.movement_concept_id IN (1, 4)
GROUP BY i_movements.id
ORDER BY i_movements.id;