const getIndex = (req, res, next) =>{
    const {protocol, hostname, port} = req;

    res.render("index", {
        google_id: process.env.GOOGLE_CLIENT_ID,
        url_success:`${protocol}://${hostname}:${process.env.PORT}/auth/google`
    });
}

const postIndex = (req, res, next) =>{
    res.json({'msg':'post users from controller'});
}

const putIndex = (req, res, next) =>{
    res.json({'msg':'put users from controller'});
}

const deleteIndex = (req, res, next) =>{
    res.json({'msg':'delete users from controller'});
}

module.exports = {
    getIndex,
    postIndex,
    putIndex,
    deleteIndex
}