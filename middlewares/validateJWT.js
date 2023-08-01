const jwt = require('jsonwebtoken');
const User = require('./../models/user');
const validateJWT = async (req, res, next) =>{
    const token = req.header('x-token');
    if(!token){
        return res.status(400).json({msg: "No esta autorizado a realizar esta operación"});
    }

    try {
        const {uid} =  jwt.verify(token, process.env.SECRETORPUBLICKEY);

        const user = await User.findById(uid);

        if( !user || !user.state ){
            return res.status(401).json({msg: "Token no validó"});
        }

        req.userAuthenticated = user;
        req.uid = uid;
        next();
    }catch (e) {
        console.log(e);
        res.status(401).json({msg: "No esta autorizado a realizar esta operación"});
    }


}

module.exports = {
    validateJWT
}