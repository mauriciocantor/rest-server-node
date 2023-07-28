const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name:{
        type: String,
        required: [true, 'El nombre es un campo obligatorio'],
    },
    email:{
        type: String,
        required: [true, 'El correo electronico es un campo obligatorio'],
        unique:true
    },
    password:{
        type: String,
        required: [true, 'El contraseña es un campo obligatorio'],
    },
    img:{
        type: String
    },
    role:{
        type: String,
        required: [true, 'Debe tener un rol asignado']
    },
    state:{
        type: Boolean,
        default: true
    },
    isGoogle:{
        type: Boolean,
        default: false,
    }
});

//omitiendo campos en la respuesta desde la BD
UserSchema.methods.toJSON = function() {
    const {__v, password, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('User', UserSchema);