const {request, response} = require("express");
const UserModel = require('../models/user');
const bcryptjs = require("bcryptjs");
const {generate} = require("../helpers/generateJWT");
const {googleVerify} = require("../helpers/googleVerify");

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

const googleSingIn = async (req, res) =>{

    const {id_token} = req.body;

    try{
        const {name, img, email} = await googleVerify(id_token);

        let user = await UserModel.findOne({email});

        if (!user){
            const data = {
                name,
                email,
                password:'123456',
                img,
                isGoogle: true,
                role: 'USER_ROLE'
            }

            user = new UserModel(data)
            await user.save();
        }

        if(!user.state){
            return res.json({
                msg: "Debe contactar al administrador, usuario Bloqueado"
            }).status(401);
        }

        const token = await generate(user.id);

        res.json({
            user,
            token
        });

    }catch (e) {
        console.error(e);
        res.json({
            msg: "Token no se pudo verificar"
        }).status(400);
    }



}

module.exports = {
    login,
    googleSingIn
}