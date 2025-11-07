import { ObjectId } from 'mongodb';
import { getDb } from '../db/connection.js';

const coll = async () => (await getDb()).collection('contacts');

export async function getAll(req, res) {
  const items = await (await coll()).find().toArray();
  res.json(items);
}
export async function getById(req, res) {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'id inválido' });
  const doc = await (await coll()).findOne({ _id: new ObjectId(id) });
  if (!doc) return res.status(404).json({ error: 'no encontrado' });
  res.json(doc);
}
export async function createOne(req, res) {
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ error: 'todos los campos son requeridos' });
  }
  const out = await (await coll()).insertOne({ firstName, lastName, email, favoriteColor, birthday });
  res.status(201).json({ id: out.insertedId }); // pide devolver id nuevo. :contentReference[oaicite:4]{index=4}
}
export async function updatePut(req, res) {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'id inválido' });
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ error: 'PUT requiere todos los campos' });
  }
  const r = await (await coll()).replaceOne({ _id: new ObjectId(id) }, { firstName, lastName, email, favoriteColor, birthday });
  if (!r.matchedCount) return res.status(404).json({ error: 'no encontrado' });
  res.status(204).end(); // “código de éxito” como pide la consigna. :contentReference[oaicite:5]{index=5}
}
export async function removeOne(req, res) {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'id inválido' });
  const r = await (await coll()).deleteOne({ _id: new ObjectId(id) });
  if (!r.deletedCount) return res.status(404).json({ error: 'no encontrado' });
  res.status(204).end();
}
