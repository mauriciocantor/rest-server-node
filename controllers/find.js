const {response} = require("express");
const fs = require("fs");
const path = require("path");
const {ObjectId} = require('mongoose').Types;

const getModelsAvailable = async() =>  {
    const directoryPath = path.join(__dirname, '/../models');
    let collectionsAvailable = [];
    await fs
        .readdirSync(directoryPath, (err, files) => {
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
        })
        .forEach((file) => {
            file = file.replace('.js', '');
            collectionsAvailable.push(file.toLowerCase());
        });
    return collectionsAvailable;
}

const find = async (req, res= response, next)=> {
    let collectionsAvailable = await getModelsAvailable();

    const {collection} = req.params;
    const {query} = req;

    // const isMongoId =  ObjectId.isValid(terms);


    if(!collectionsAvailable.includes(collection.toLowerCase())){
        return res.status(400).json({
            msg: `${collection} no hace parte de las colecciones validas, estas colecciones serian: ${collectionsAvailable.join(', ')}`
        })
    }

    const Model = require(`./../models/${collection.toLowerCase()}`);

    const resultQuery = await Model.find(query);


    res.json({
        info: resultQuery
    })
}

module.exports = {
    find
}