const {request, response} = require("express");
const UserModel = require('../models/user');
const bcryptjs = require("bcryptjs");
const {generate} = require("../helpers/generateJWT");

function errorLogin(res) {
    res.json({
        msg: "Usuario ó Contraseña no son correctos"
    }).status(400);
}

const login = async (req = request, res= response, next) =>{

    const {email, password} = req.body;

    try{
        // Verificar si esta activo el usuario
        const user = await UserModel.findOne({ email });

        if(!user.state){
            errorLogin(res);
            return;
        }

        // verificar la contraseña

        const validPassword = bcryptjs.compareSync(password, user.password);

        if(!validPassword){
            errorLogin(res);
            return;
        }

        const token = await generate(user.id);

        res.json({
            user,
            token
        });
    }catch (e) {
        console.error(e);
        res.json({
            msg: "Login OK"
        }).status(500);
    }

}

module.exports = {
    login,
}