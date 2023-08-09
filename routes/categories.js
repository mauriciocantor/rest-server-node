var express = require('express');
var router = express.Router();

const {check} = require("express-validator");

// Habilitando la importación de middleware desde un archivo central index
const {fieldValidation, validateJWT, hasRole} = require("../middlewares");
const {getCategories, saveCategories, getCategoryById, updateCategory, deleteCategory} = require("../controllers/categories");
const {categoryExist} = require("../middlewares/validateCategory");

/* GET test listing. */
router.get('/', getCategories);

router.get('/:id', [
    check('id', 'No es un ID Válido').isMongoId().custom(categoryExist),
    fieldValidation
], getCategoryById);

router.post('/', [
    validateJWT,
    check('name', 'Debe ingresar el nombre del producto').not().isEmpty(),
    fieldValidation
], saveCategories);

router.put('/:id', [
    validateJWT,
    check('id', 'No es un ID Válido').isMongoId().custom(categoryExist),
    fieldValidation
], updateCategory);

router.delete('/:id',[
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('id', 'No es un ID Válido').isMongoId().custom(categoryExist),
    fieldValidation
],deleteCategory);

// validar id del parametro en middleware



module.exports = router;
