CREATE OR REPLACE VIEW purchase_view AS
SELECT 
  i_movements.id,
  i_movements.inventory_card_id,
  i_movements.date,
  m_concepts.name AS movement_concept_name,
  users.username AS created_by,
  i_movements.quantity,
  i_movements.unit_cost,
  (i_movements.quantity - IFNULL((
    SELECT SUM(i_movement_related.quantity)
    FROM inventory_movements i_movement_related
    WHERE i_movement_related.related_movement_id = i_movements.id
      AND i_movement_related.movement_concept_id IN (2, 3)
  ), 0)) AS available_stock,
  (i_movements.quantity * i_movements.unit_cost) AS debit
FROM inventory_movements i_movements
LEFT JOIN movement_concepts m_concepts ON i_movements.movement_concept_id = m_concepts.id
LEFT JOIN users ON users.id = i_movements.user_id
LEFT JOIN movement_references m_references ON i_movements.id = m_references.inventory_movement_id
WHERE i_movements.movement_concept_id IN (1, 4)
ORDER BY i_movements.id;