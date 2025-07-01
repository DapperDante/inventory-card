import { Router } from 'express';
import { applyRole } from '../middlewares/role.middleware';
import { validateFields } from '../middlewares/validateFields.middleware';
import { MovementFields } from '../classes/fields.class';
import { validateTokenFields } from '../middlewares/tokenFields.middleware';
import { getBalance, getMovements, initialBalance, productionRequired, productionReturn, purchase, purchaseReturn, sale, saleReturn } from '../controllers/movement.controller';

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

movementRoutes.post('/purchase_return', [
  applyRole('admin'),
  validateFields(MovementFields.exit),
  validateTokenFields("user_id", "card_id"),
], purchaseReturn);

movementRoutes.post('/sale_return', [
  applyRole('admin'),
  validateFields(MovementFields.exit),
  validateTokenFields("user_id", "card_id"),
], saleReturn);

movementRoutes.post('/production_required', [
  applyRole('admin'),
  validateFields(MovementFields.exit),
  validateTokenFields("user_id", "card_id"),
], productionRequired);

movementRoutes.post('/production_return', [
  applyRole('admin'),
  validateFields(MovementFields.exit),
  validateTokenFields("user_id", "card_id"),
], productionReturn);

movementRoutes.get('/all', [
  applyRole('admin'),
  validateTokenFields("user_id", "card_id"),
], getMovements);

movementRoutes.get('/balance', [
  applyRole('admin'),
  validateTokenFields("card_id"),
], getBalance);

export default movementRoutes;