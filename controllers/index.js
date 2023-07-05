const getIndex = (req, res, next) =>{
    res.json({msg: 'Get index'});
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