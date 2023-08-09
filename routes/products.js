var express = require('express');
var router = express.Router();

const {check} = require("express-validator");

// Habilitando la importación de middleware desde un archivo central index
const {fieldValidation, validateJWT, hasRole} = require("../middlewares");
const {getProducts, saveProduct, getProductById, updateProduct, deleteProduct} = require("../controllers/products");
const {productExist} = require("../middlewares/validateProduct");

/* GET test listing. */
router.get('/', getProducts);

router.get('/:id', [
    check('id', 'No es un ID Válido').isMongoId().custom(productExist),
    fieldValidation
], getProductById);

router.post('/', [
    validateJWT,
    fieldValidation
], saveProduct);

router.put('/:id', [
    validateJWT,
    check('id', 'No es un ID Válido').isMongoId().custom(productExist),
    fieldValidation
], updateProduct);

router.delete('/:id',[
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('id', 'No es un ID Válido').isMongoId().custom(productExist),
    fieldValidation
],deleteProduct);


module.exports = router;