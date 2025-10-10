const bcrypt = require('bcryptjs');
const db = require('../models/userModel');


const createUser = async (req, res) => {
  const { nombre, email, password } = req.body;

  
  if (db.usuarios.find(u => u.email === email)) {
    return res.status(400).json({ msg: 'Email ya registrado' });
  }

  const hashed = await bcrypt.hash(password, 10);
  const nuevo = { id: db.idCounter++, nombre, email, password: hashed };

  db.usuarios.push(nuevo);

  const { password: _, ...safe } = nuevo;
  res.status(201).json(safe);
};

const listUsers = (req, res) => {
  const safe = db.usuarios.map(({ password, ...rest }) => rest);
  res.json(safe);
};

const getUserById = (req, res) => {
  const user = db.usuarios.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

  const { password, ...safe } = user;
  res.json(safe);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, password } = req.body;

  const user = db.usuarios.find(u => u.id == id);
  if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

  if (email && email !== user.email && db.usuarios.find(u => u.email === email)) {
    return res.status(400).json({ msg: 'Email ya en uso' });
  }

  if (nombre) user.nombre = nombre;
  if (email) user.email = email;
  if (password) user.password = await bcrypt.hash(password, 10);

  const { password: _, ...safe } = user;
  res.json(safe);
};

const deleteUser = (req, res) => {
  const index = db.usuarios.findIndex(u => u.id == req.params.id);
  if (index === -1) return res.status(404).json({ msg: 'Usuario no encontrado' });

  db.usuarios.splice(index, 1);
  res.status(204).send();
};

module.exports = { createUser, listUsers, getUserById, updateUser, deleteUser };

