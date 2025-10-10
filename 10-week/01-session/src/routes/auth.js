const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validate = require('../middlewares/validate');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userModel = require('../models/userModel');
const { SECRET, EXPIRES_IN } = require('../middlewares/auth');

router.post('/login',
  [
    body('email').isEmail().withMessage('email inválido'),
    body('password').exists().withMessage('password requerido')
  ],
  validate,
  async (req, res) => {
    const { email, password } = req.body;
    const user = userModel.findByEmail(email);
    if (!user) return res.status(401).json({ msg: 'Credenciales inválidas' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ msg: 'Credenciales inválidas' });

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      SECRET,
      { expiresIn: EXPIRES_IN }
    );

    res.json({ token });
  }
);

module.exports = router;
