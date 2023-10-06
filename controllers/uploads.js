const {response} = require("express");
const {uploadOwnFiles} = require("../helpers/uploadOwnFiles");

const UserModel = require('../models/user');
const Product = require('../models/product');
const path = require("path");
const fs = require("fs");

const uploadFileOwn = async (req, res = response) =>{

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

const uploadFileUser = async (req, res= response) =>{

    const {id, collection} = req.params;
    let modelo;

    switch (collection) {
        case 'user':
            modelo = await UserModel.findById(id);
            if(!modelo){
                return res.status(400).json({msg:`No existe usuario con el id: ${id}`});
            }

            break;
        case 'product':
            modelo = await Product.findById(id);
            if(!modelo){
                return res.status(400).json({msg:`No existe producto con el id: ${id}`});
            }

            break;
        default:
            return res.status(500).json({msg:'No existe la colección enviada'});

    }

    //limpiar imagen previa
    if(modelo.img){
        const pathImage = path.join(__dirname,'../','uploads',collection,modelo.img);
        if(fs.existsSync(pathImage)) {
            fs.unlinkSync(pathImage);
        }
    }

    modelo.img = await uploadOwnFiles({
        files: req.files,
        pathTarget: collection
    });

    await modelo.save();

    res.json({
        resp: modelo
    });
}

const getImages = async (req, res = response) =>{
    const {id, collection} = req.params;
    const pathPlaceholder = path.join(__dirname,'../','assets','no-image.jpg');
    let modelo;

    switch (collection) {
        case 'user':
            modelo = await UserModel.findById(id);
            if(!modelo){
                return res.status(400).json({msg:`No existe usuario con el id: ${id}`});
            }

            break;
        case 'product':
            modelo = await Product.findById(id);
            if(!modelo){
                return res.status(400).json({msg:`No existe producto con el id: ${id}`});
            }

            break;
        default:
            return res.status(500).json({msg:'No existe la colección enviada'});

    }

    if(modelo.img){
        const pathImage = path.join(__dirname,'../','uploads',collection,modelo.img);
        if(fs.existsSync(pathImage)) {
            return res.sendFile(pathImage);
        }
    }

    res.sendFile(pathPlaceholder);
}

module.exports = {
    uploadFileOwn,
    uploadFileUser,
    getImages
}