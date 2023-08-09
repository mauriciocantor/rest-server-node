const {request, response} = require("express");

const Product = require('./../models/product');

/**
 * Obtener todas las categorias
 */
const getProducts = async (req = request, res = response, next) =>{
    const {limit = 5, from=0} = req.query;
    const filter = {status:true};

    /**
     * haciendo el consumo asincrono para obtener las respuestas en un solo llamado
     */
    const [total, products] = await Promise.all([
        Product.countDocuments(filter),
        Product.find(filter)
            .populate(["user","category","userModifier"])
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({total, products, limit, from});
}


/**
 * Obtener una categoria por ID
 */

const getProductById = async (req = request, res = response, next) =>{
    const id = req.params.id;

    const category = await Product.findById(id).populate(["user","category","userModifier"]);

    res.json({category});
}


/**
 * Crear categoria - privado con token valido
 */

const saveProduct = async (req = request, res = response, next) =>{
    const {name, ...body} = req.body;
    const {userAuthenticated} = req;
    const productDB = await Product.findOne({name});

    if(productDB){
        return res.status(400).json({
            msg:`La categoria ${name} ya existe`
        });
    }

    const data = {
        name: name.toUpperCase(),
        ...body,
        user: userAuthenticated._id
    }

    const product = new Product(data);
    await product.save();

    res.status(201).json({product});
}


/**
 * Actualizar una categoria por id - privado con token valido
 */

const updateProduct = async (req, res, next) => {
    const id = req.params.id;
    const {status, user, ...body} = req.body;
    const {userAuthenticated} = req;

    body.userModifier = userAuthenticated._id;

    const product = await Product.findOneAndUpdate({_id: id}, body,{new: true}).populate(["user","category","userModifier"]);

    res.json({
        product
    });

}

/**
 * Eliminado logico de una categoria - privado solo admin
 */

const deleteProduct = async (req = request, res = response, next) =>{
    const {id} = req.params;
    const {userAuthenticated} = req;

    //borrado logico
    const product = await Product
        .findByIdAndUpdate(id, {status: false, userModifier: userAuthenticated._id}, {new: true} )
        .populate(["user","category","userModifier"])
    ;

    res.json({
        product,
        userAuthenticated
    });
}

module.exports = {
    getProducts,
    getProductById,
    saveProduct,
    updateProduct,
    deleteProduct
}