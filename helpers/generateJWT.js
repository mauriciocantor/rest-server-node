const jwt = require('jsonwebtoken');

const generate = (uid='') => {
    return new Promise((resolve, reject) => {

        const payload = { uid };
        jwt.sign(payload, process.env.SECRETORPUBLICKEY, {
            expiresIn: '1h'
        },(err, token)=>{
            if(err){
                console.log(err);
                reject('No fue posible generar el token');
            }else{
                resolve(token);
            }
        });
    });
}

module.exports = {
    generate
}