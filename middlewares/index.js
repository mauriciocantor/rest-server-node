
const fieldValidation = require("../middlewares/field-validation");
const validateJWT = require("../middlewares/validateJWT");
const validateRoles = require("../middlewares/validateRoles");

module.exports = {
    ...fieldValidation,
    ...validateJWT,
    ...validateRoles,
}