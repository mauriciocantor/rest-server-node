const mongoose = require('mongoose');

const dbConnection = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(()=>console.log('Connected to mongodb'))
            .catch(err=>console.error(err))
        ;
    }catch (e) {
        console.log(e);
        throw new Error('Error en la conexión con la Base de datos');
    }
};

module.exports = {
    dbConnection
}