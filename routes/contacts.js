// routes/contacts.js
import { Router } from 'express';
import {
  getAll,
  getById,
  createOne,
  updatePut,
  removeOne,
} from '../controllers/contacts.js';

const router = Router();

// Solo definimos las rutas y a qué controlador apuntan
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createOne);
router.put('/:id', updatePut);
router.delete('/:id', removeOne);

export default router;
