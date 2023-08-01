const {request, response} = require("express");
const bcrypt = require("bcryptjs");

const User = require('./../models/user');
const getUsers = async (req = request, res= response, next) =>{
    const {limit = 5, from=0} = req.query;
    const filter = {state:true};
/*    const users = await User.find(filter)
        .skip(Number(from))
        .limit(Number(limit))
    ;

    const total = await User.countDocuments(filter);*/
// haciendo el consumo asincrono para obtener las respuestas en un solo llamado
    const [total, users] = await Promise.all([
        User.countDocuments(filter),
        User.find(filter)
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({total,users, limit, from});
}
const postUsers = async (req = request, res= response, next) =>{
    const { body } = req;
    const user = new User({name, email, password, role} = body);

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password,salt);

    await user.save();
    res.json({
        user
        });
}

const putUsers = async (req = request, res= response, next) =>{
    const { body, params, query } = req;
    const {_id, password, google, email, ...othersParams} = body;
    //todo validar contra BD
    if(password){
        const salt = bcrypt.genSaltSync();
        othersParams.password = bcrypt.hashSync(password,salt);
    }

    const user = await User.findByIdAndUpdate(params.id, othersParams);

    res.json({
        user
    });
}

const deleteUsers = async (req = request, res= response, next) =>{
    const {id} = req.params;
    const {userAuthenticated} = req;
    // const {uid} = req;
    //borrado fisico
    // const user = await User.findByIdAndDelete(id);

    //borrado logico
    const user = await User.findByIdAndUpdate(id, {state: false}, {new: true} );

    res.json({
        user,
        userAuthenticated
    });
}

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers
}