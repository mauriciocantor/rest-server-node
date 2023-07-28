var express = require('express');
var router = express.Router();

const {check} = require("express-validator");
const {fieldValidation} = require("../middlewares/field-validation");
const {isRoleValid, emailExist, userIdExist} = require("../helpers/dbValidators");

const {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers
} = require('./../controllers/user');

/* GET test listing. */
router.get('/', [
    check('from', 'Debe enviar un numero').isNumeric(),
    check('limit', 'Debe enviar un numero').isNumeric(),
    fieldValidation,
],getUsers);

router.post('/', [
    check('name', 'El Nombre es obligatorio.').not().isEmpty(),
    check('password', 'La contraseña es obligatorio o debe tener mas de 6 letras.').not().isEmpty().isLength({min:6}),
    check('email', 'El correo no es válido.').isEmail().custom(emailExist),
    // check('role', 'El Rol enviado no es valido.').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom(isRoleValid),
    fieldValidation,
] ,postUsers);

router.put('/:id', [
    check('id', 'No es un ID Válido').isMongoId().custom(userIdExist),
    check('role').custom(isRoleValid),
    fieldValidation,
],putUsers);

router.delete('/:id', [
    check('id', 'No es un ID Válido').isMongoId().custom(userIdExist),
    fieldValidation,
],deleteUsers);

module.exports = router;
