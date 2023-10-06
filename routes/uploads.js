var express = require('express');

const {check} = require("express-validator");

// Habilitando la importación de middleware desde un archivo central index
const {fieldValidation, validateFileUpload} = require("../middlewares");

var router = express.Router();

const {uploadFileOwn, uploadFileUser, getImages} = require("../controllers/uploads");
const {collectionAvailable} = require("../helpers/dbValidators");

router.post('/', validateFileUpload,  uploadFileOwn);

router.put('/:collection/:id', [
    validateFileUpload,
    check('id', 'El ID debe ser de mongo').isMongoId(),
    check('collection').custom( c => collectionAvailable(c, ['user', 'product']) ),
    fieldValidation
],  uploadFileUser);

router.get('/:collection/:id',[
    check('id', 'El ID debe ser de mongo').isMongoId(),
    check('collection').custom( c => collectionAvailable(c, ['user', 'product']) ),
    fieldValidation
], getImages)



module.exports = router;
