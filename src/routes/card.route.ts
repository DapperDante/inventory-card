import { Router } from 'express';
import { applyRole } from '../middlewares/role.middleware';
import { validateFields } from '../middlewares/validateFields.middleware';
import { accessCard, addCard, getCard, getCards } from '../controllers/card.controller';
import { validateTokenFields } from '../middlewares/tokenFields.middleware';
import { CardFields } from '../classes/fields.class';

const cardRoutes = Router();

cardRoutes.post('/', [
  applyRole('admin'), 
  validateFields(CardFields.create),
], addCard);

cardRoutes.post('/:id', [
  applyRole('admin'),
  validateTokenFields('company_id', 'product_id')
], accessCard);

cardRoutes.get('/all', [
  applyRole('admin'),
  validateTokenFields('company_id', 'product_id')
], getCards);

cardRoutes.get('/', [
  applyRole('admin'),
  validateTokenFields('company_id', 'product_id', 'card_id')
], getCard);

export default cardRoutes;