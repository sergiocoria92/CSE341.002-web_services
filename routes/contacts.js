// routes/contacts.js
const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const dbo = require('../db/conn');

// GET /contacts → all contacts
router.get('/', async (req, res) => {
  try {
    const db = dbo.getDb();
    const contacts = await db.collection('contacts').find({}).toArray();
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error getting contacts:', error);
    res.status(500).json({ message: 'Error getting contacts' });
  }
});

// GET /contacts/:id → one contact
router.get('/:id', async (req, res) => {
  try {
    const db = dbo.getDb();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid id' });
    }

    const contact = await db
      .collection('contacts')
      .findOne({ _id: new ObjectId(id) });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error('Error getting contact:', error);
    res.status(500).json({ message: 'Error getting contact' });
  }
});

// 👇 ESTA LÍNEA ES LA IMPORTANTE
module.exports = router;
