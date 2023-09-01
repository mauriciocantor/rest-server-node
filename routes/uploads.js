var express = require('express');

const {check} = require("express-validator");

// Habilitando la importación de middleware desde un archivo central index
const {fieldValidation, validateJWT, hasRole} = require("../middlewares");

var router = express.Router();

const {uploadFileOwn} = require("../controllers/uploads");

router.post('/', [

] , uploadFileOwn);

module.exports = router;
