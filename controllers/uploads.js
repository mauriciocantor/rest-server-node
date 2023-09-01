const {response} = require("express");
const {uploadOwnFiles} = require("../helpers/uploadOwnFiles");

const uploadFileOwn = async (req, res = response) =>{

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        res.status(400).json({msg:'No hay archivos para subir.'});
        return;
    }
    try {
        const file = await uploadOwnFiles({
                files: req.files
            });

        res.json({
            file
        })
    }catch (msg) {
        res.status(400).json({
            msg
        })
    }
}

module.exports = {
    uploadFileOwn
}