
const fieldValidation = require("../middlewares/field-validation");
const validateJWT = require("../middlewares/validateJWT");
const validateRoles = require("../middlewares/validateRoles");
const validateFileUpload = require("../middlewares/validateFile");

module.exports = {
    ...fieldValidation,
    ...validateJWT,
    ...validateRoles,
    ...validateFileUpload,
}