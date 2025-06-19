CREATE OR REPLACE VIEW movement_view AS
SELECT 
  i_movements.id,
  i_movements.inventory_card_id,
  i_movements.date,
  m_concepts.name AS movement_concept_name,
  users.username AS created_by,
  i_movements.quantity,
  IFNULL(i_movements.unit_cost, IFNULL(i_movements_related.unit_cost, i_movements_related_sub.unit_cost)) AS unit_cost,
  SUM(
    CASE 
      WHEN i_movements.movement_concept_id IN (1, 4, 5, 7) THEN i_movements.quantity
      WHEN i_movements.movement_concept_id IN (2, 3, 6) THEN -i_movements.quantity
      ELSE 0
    END
  ) OVER (
    PARTITION BY i_movements.inventory_card_id
    ORDER BY i_movements.id
  ) AS stock,
  SUM(
    CASE
      WHEN i_movements.movement_concept_id IN (1, 4, 5, 7) THEN 
        i_movements.quantity * IFNULL(i_movements.unit_cost, IFNULL(i_movements_related.unit_cost, i_movements_related_sub.unit_cost))
      WHEN i_movements.movement_concept_id IN (2, 3, 6) THEN 
        -i_movements.quantity * IFNULL(i_movements.unit_cost, IFNULL(i_movements_related.unit_cost, i_movements_related_sub.unit_cost))
      ELSE 0
      END
  ) 
  OVER (
    PARTITION BY i_movements.inventory_card_id 
    ORDER BY i_movements.id
  ) AS final_balance
FROM inventory_movements i_movements
JOIN movement_concepts m_concepts ON i_movements.movement_concept_id = m_concepts.id
LEFT JOIN inventory_movements i_movements_related ON i_movements.related_movement_id = i_movements_related.id
LEFT JOIN inventory_movements i_movements_related_sub ON i_movements_related.related_movement_id = i_movements_related_sub.id
JOIN users ON users.id = i_movements.user_id;