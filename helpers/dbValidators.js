const Role = require("../models/role");
const User = require("../models/user");
const isRoleValid = async (role="")=>{
    const existRole = await Role.findOne({rol:role})
    if(!existRole) {
        throw new Error(`Role ${role} no esta registrado en BD.`);
    }
}

const emailExist = async (email="")=>{
    const existEmail = await User.findOne({email});
    if(existEmail) {
        throw new Error(`El correo ${email} ya se encuentra registrado.`);
    }
}

const userIdExist = async (id="")=>{
    const existEmail = await User.findById( id);
    if(!existEmail) {
        throw new Error(`El Id ${id} no existe.`);
    }
}

const emailExistToLogin = async (email="")=>{
    const existEmail = await User.findOne({email});
    if(!existEmail) {
        throw new Error(`La información enviada no concuerda, confirma el email o la contraseña.`);
    }
}

const collectionAvailable = (collection='', collections=[]) =>{
    if(!collections.includes(collection)){
        throw new Error(`La colección ${collection} no es permitida, (${collections.join(', ')})`);
    }
    return true;
}


module.exports = {
    isRoleValid,
    emailExist,
    userIdExist,
    emailExistToLogin,
    collectionAvailable
}