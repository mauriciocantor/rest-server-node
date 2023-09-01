const dbValidator = require('./dbValidators');
const generateJWT = require('./generateJWT');
const googleVerify = require('./googleVerify');
const uploadOwnFiles = require('./uploadOwnFiles');


module.exports = {
    ...dbValidator,
    ...uploadOwnFiles,
    ...generateJWT,
    ...googleVerify
}