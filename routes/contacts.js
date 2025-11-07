// routes/contacts.js (ES Modules, versión final)
import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from '../db/conn.js';

const router = Router();
const coll = () => getDb().collection('contacts');

// GET /contacts → all
router.get('/', async (_req, res) => {
  try {
    const items = await coll().find({}).toArray();
    res.status(200).json(items);
  } catch (err) {
    console.error('Error getting contacts:', err);
    res.status(500).json({ message: 'Error getting contacts' });
  }
});

// GET /contacts/:id → one
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });

    const doc = await coll().findOne({ _id: new ObjectId(id) });
    if (!doc) return res.status(404).json({ message: 'Contact not found' });

    res.status(200).json(doc);
  } catch (err) {
    console.error('Error getting contact:', err);
    res.status(500).json({ message: 'Error getting contact' });
  }
});

// POST /contacts → create (todos los campos requeridos)
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const out = await coll().insertOne({ firstName, lastName, email, favoriteColor, birthday });
    // La rúbrica sugiere devolver el id nuevo; 201 Created
    res.status(201).json({ id: out.insertedId });
  } catch (err) {
    console.error('Error creating contact:', err);
    res.status(500).json({ message: 'Error creating contact' });
  }
});

// PUT /contacts/:id → replace (requiere TODOS los campos)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });

    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    if (firstName == null || lastName == null || email == null || favoriteColor == null || birthday == null) {
      return res.status(400).json({ message: 'All fields are required for PUT' });
    }

    const r = await coll().replaceOne(
      { _id: new ObjectId(id) },
      { firstName, lastName, email, favoriteColor, birthday }
    );
    if (!r.matchedCount) return res.status(404).json({ message: 'Contact not found' });

    // 204 No Content (como pide la consigna)
    res.status(204).end();
  } catch (err) {
    console.error('Error replacing contact:', err);
    res.status(500).json({ message: 'Error replacing contact' });
  }
});

// DELETE /contacts/:id → delete
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });

    const r = await coll().deleteOne({ _id: new ObjectId(id) });
    if (!r.deletedCount) return res.status(404).json({ message: 'Contact not found' });

    // 204 No Content
    res.status(204).end();
  } catch (err) {
    console.error('Error deleting contact:', err);
    res.status(500).json({ message: 'Error deleting contact' });
  }
});

export default router;
