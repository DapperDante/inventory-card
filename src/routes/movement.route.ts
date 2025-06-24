import { Router } from 'express';
import { applyRole } from '../middlewares/role.middleware';
import { validateFields } from '../middlewares/validateFields.middleware';
import { MovementFields } from '../classes/fields.class';
import { validateTokenFields } from '../middlewares/tokenFields.middleware';
import { getMovements, initialBalance, productionRequired, productionReturn, purchase, purchaseReturn, sale, saleReturn } from '../controllers/movement.controller';

const movementRoutes = Router();

movementRoutes.post('/initial_balance', [
  applyRole('admin'),
  validateFields(MovementFields.entry),
  validateTokenFields("user_id", "card_id"),
], initialBalance);

movementRoutes.post('/purchase', [
  applyRole('admin'),
  validateFields(MovementFields.entry),
  validateTokenFields("user_id", "card_id"),
], purchase);

movementRoutes.post('/sale', [
  applyRole('admin'),
  validateFields(MovementFields.exit),
  validateTokenFields("user_id", "card_id"),
], sale);

movementRoutes.post('/purchase-return', [
  applyRole('admin'),
  validateFields(MovementFields.exit),
  validateTokenFields("user_id", "card_id"),
], purchaseReturn);

movementRoutes.post('/sale-return', [
  applyRole('admin'),
  validateFields(MovementFields.exit),
  validateTokenFields("user_id", "card_id"),
], saleReturn);

movementRoutes.post('/production-required', [
  applyRole('admin'),
  validateFields(MovementFields.exit),
  validateTokenFields("user_id", "card_id"),
], productionRequired);

movementRoutes.post('/production-return', [
  applyRole('admin'),
  validateFields(MovementFields.exit),
  validateTokenFields("user_id", "card_id"),
], productionReturn);

movementRoutes.get('/all', [
  applyRole('admin'),
  validateTokenFields("user_id", "card_id"),
], getMovements);

export default movementRoutes;