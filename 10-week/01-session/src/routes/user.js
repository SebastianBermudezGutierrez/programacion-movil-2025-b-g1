const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const usersController = require('../controllers/usersController');

router.post('/',
  [
    body('nombre').notEmpty().withMessage('nombre requerido'),
    body('email').isEmail().withMessage('email inválido'),
    body('password').isLength({ min: 6 }).withMessage('password mínimo 6 caracteres')
  ],
  validate,
  usersController.createUser
);

// proteger las siguientes rutas
router.get('/', auth, usersController.listUsers);
router.get('/:id', auth, usersController.getUserById);

router.put('/:id',
  auth,
  [
    param('id').notEmpty(),
    body('nombre').optional().isString(),
    body('email').optional().isEmail(),
    body('password').optional().isLength({ min: 6 })
  ],
  validate,
  usersController.updateUser
);

router.delete('/:id', auth, usersController.deleteUser);

module.exports = router;
