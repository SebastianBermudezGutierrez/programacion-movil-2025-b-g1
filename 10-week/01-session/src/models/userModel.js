const { v4: uuidv4 } = require('uuid');

let usuarios = [];

const createUser = (nombre, email, password) => {
  const user = {
    id: uuidv4(),
    nombre,
    email,
    password,
    fecha_creacion: new Date().toISOString()
  };
  usuarios.push(user);
  return user;
};

const listUsers = (email) => {
  return usuarios.find(u => u.email === email);
};

const getUserById = (id) => {
  return usuarios.find(u => u.id === id);
};

const updateUser = (id, updates) => {
  const index = usuarios.findIndex(u => u.id === id);
  if (index === -1) return null;

  usuarios[index] = { ...usuarios[index], ...updates };
  return usuarios[index];
};

const deleteUser = (id) => {
  const index = usuarios.findIndex(u => u.id === id);
  if (index === -1) return false;

  usuarios.splice(index, 1);
  return true;
};

module.exports = {
  usuarios,
  createUser, 
  listUsers, 
  getUserById, 
  updateUser, 
  deleteUser
};
