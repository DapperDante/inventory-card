CREATE OR REPLACE VIEW sale_return_view AS
SELECT
  i_movements.id,
  i_movements.inventory_card_id,
  i_movements.related_movement_id AS parent_id,
  i_movements.date,
  users.username AS created_by,
  i_movements.quantity,
  i_movements_related_sub.unit_cost
FROM inventory_movements i_movements
LEFT JOIN users ON users.id = i_movements.user_id
LEFT JOIN movement_references m_references ON i_movements.id = m_references.inventory_movement_id
LEFT JOIN inventory_movements i_movements_related ON i_movements_related.id = i_movements.related_movement_id
LEFT JOIN inventory_movements i_movements_related_sub ON i_movements_related_sub.id = i_movements_related.related_movement_id
WHERE i_movements.movement_concept_id = 5
ORDER BY i_movements.id;