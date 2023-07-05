const {request, response} = require("express");


const getUsers = (req = request, res= response, next) =>{
    res.json({'msg':'get users from controller'});
}

const postUsers = (req = request, res= response, next) =>{
    const { body } = req;

    res.json({
        'msg':'post users from controller',
        body
        });
}

const putUsers = (req = request, res= response, next) =>{
    const { body, params, query } = req;
    res.json({
        'msg':'put users from controller',
        body,
        params,
        query
    });
}

const deleteUsers = (req = request, res= response, next) =>{
    res.json({'msg':'delete users from controller'});
}

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers
}