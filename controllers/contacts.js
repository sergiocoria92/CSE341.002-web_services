import { ObjectId } from 'mongodb';
import { getDb } from '../db/connection.js';

const coll = async () => (await getDb()).collection('contacts');

export async function getAll(req, res) {
  const items = await (await coll()).find().toArray();
  res.json(items);
}

export async function getById(req, res) {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'invalid id' });
  const doc = await (await coll()).findOne({ _id: new ObjectId(id) });
  if (!doc) return res.status(404).json({ error: 'not found' });
  res.json(doc);
}

export async function createOne(req, res) {
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ error: 'all fields are required' });
  }
  const out = await (await coll()).insertOne({
    firstName,
    lastName,
    email,
    favoriteColor,
    birthday,
  });
  // Return the newly created id
  res.status(201).json({ id: out.insertedId });
}

export async function updatePut(req, res) {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'invalid id' });
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ error: 'PUT requires all fields' });
  }
  const r = await (await coll()).replaceOne(
    { _id: new ObjectId(id) },
    { firstName, lastName, email, favoriteColor, birthday }
  );
  if (!r.matchedCount) return res.status(404).json({ error: 'not found' });
  // Success with no content
  res.status(204).end();
}

export async function removeOne(req, res) {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'invalid id' });
  const r = await (await coll()).deleteOne({ _id: new ObjectId(id) });
  if (!r.deletedCount) return res.status(404).json({ error: 'not found' });
  res.status(204).end();
}
