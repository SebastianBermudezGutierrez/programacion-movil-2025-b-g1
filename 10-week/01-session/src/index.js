require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const usersRouter = require('./routes/user');
const authRouter = require('./routes/auth');

app.use('/api/usuarios', usersRouter);
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API en http://localhost:${PORT}`));
