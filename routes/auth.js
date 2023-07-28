var express = require('express');
const {check} = require("express-validator");
const {emailExistToLogin} = require("../helpers/dbValidators");
const {fieldValidation} = require("../middlewares/field-validation");
const {login} = require("../controllers/auth");

var router = express.Router();

router.post('/login', [
    check('email', 'El correo no es válido.').isEmail().custom(emailExistToLogin),
    check('password', 'La contraseña es obligatorio o debe tener mas de 6 letras.').not().isEmpty().isLength({min:6}),
    fieldValidation,
] ,login);

module.exports = router;