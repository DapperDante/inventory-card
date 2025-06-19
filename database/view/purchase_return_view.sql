CREATE OR REPLACE VIEW purchase_return_view AS
SELECT 
  i_movements.id,
  i_movements.related_movement_id AS parent_id,
  i_movements.inventory_card_id,
  i_movements.date,
  m_concepts.name AS movement_concept_name,
  users.username AS created_by,
  i_movements.quantity,
  i_movements_related.unit_cost AS unit_cost
FROM inventory_movements i_movements
LEFT JOIN movement_concepts m_concepts ON i_movements.movement_concept_id = m_concepts.id
LEFT JOIN users ON users.id = i_movements.user_id
LEFT JOIN movement_references m_references ON i_movements.id = m_references.inventory_movement_id
LEFT JOIN inventory_movements i_movements_related ON i_movements.related_movement_id = i_movements_related.id
WHERE i_movements.movement_concept_id = 3
ORDER BY i_movements.date ASC;