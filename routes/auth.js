var express = require('express');
const {check} = require("express-validator");
const {emailExistToLogin} = require("../helpers/dbValidators");
const {fieldValidation} = require("../middlewares/field-validation");
const {login, googleSingIn} = require("../controllers/auth");

var router = express.Router();

router.post('/login', [
    check('email', 'El correo no es válido.').isEmail().custom(emailExistToLogin),
    check('password', 'La contraseña es obligatorio o debe tener mas de 6 letras.').not().isEmpty().isLength({min:6}),
    fieldValidation,
] ,login);

router.post('/google', [
    check('id_token', 'El token de Google es necesario.').not().isEmpty(),
    fieldValidation,
],googleSingIn);

module.exports = router;