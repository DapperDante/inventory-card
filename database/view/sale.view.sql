CREATE OR REPLACE VIEW sale_view AS
SELECT 
  i_movements.id,
  i_movements.related_movement_id AS parent_id,
  i_movements.inventory_card_id,
  i_movements.date,
  users.username AS created_by,
  i_movements.quantity,
  i_movements_related.unit_cost AS unit_cost,
  (i_movements.quantity - IFNULL(s_return_view.quantity, 0)) AS available_stock
FROM inventory_movements i_movements
LEFT JOIN users ON users.id = i_movements.user_id
LEFT JOIN movement_references m_references ON i_movements.id = m_references.inventory_movement_id
LEFT JOIN inventory_movements i_movements_related ON i_movements.related_movement_id = i_movements_related.id
LEFT JOIN sale_return_view s_return_view ON s_return_view.parent_id = i_movements.id
WHERE i_movements.movement_concept_id = 2
ORDER BY i_movements.date ASC;