const {request, response} = require("express");

const Category = require('./../models/category');

/**
 * Obtener todas las categorias
 */
const getCategories = async (req = request, res= response, next) =>{
    const {limit = 5, from=0} = req.query;
    const filter = {status:true};

    /**
     * haciendo el consumo asincrono para obtener las respuestas en un solo llamado
     */
    const [total, categories] = await Promise.all([
        Category.countDocuments(filter),
        Category.find(filter)
            .populate("user")
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({total, categories, limit, from});
}


/**
 * Obtener una categoria por ID
 */

const getCategoryById = async (req = request, res= response, next) =>{
    const id = req.params.id;

    const category = await Category.findById(id).populate("user");

    res.json({category});
}


/**
 * Crear categoria - privado con token valido
 */

const saveCategories = async (req = request, res= response, next) =>{
    const name = req.body.name.toUpperCase();
    const {userAuthenticated} = req;
    const categoryDB = await Category.findOne({name});

    if(categoryDB){
        return res.status(400).json({
            msg:`La categoria ${name} ya existe`
        });
    }

    const data = {
        name,
        user: userAuthenticated._id
    }

    const category = new Category(data);
    await category.save();

    res.status(201).json({category});
}


/**
 * Actualizar una categoria por id - privado con token valido
 */

const updateCategory = async (req, res, next) => {
    const id = req.params.id;
    const {status, user, ...body} = req.body;
    const {userAuthenticated} = req;

    body.userModifier = userAuthenticated.uid;

    const category = await Category.findOneAndUpdate({_id:id}, body,{new: true}).populate('user');

    res.json({
        category
    });

}

/**
 * Eliminado logico de una categoria - privado solo admin
 */

const deleteCategory = async (req = request, res= response, next) =>{
    const {id} = req.params;
    const {userAuthenticated} = req;

    //borrado logico
    const category = await Category.findByIdAndUpdate(id, {status: false, userModifier: userAuthenticated.uid}, {new: true} );

    res.json({
        category,
        userAuthenticated
    });
}

module.exports = {
    getCategories,
    getCategoryById,
    saveCategories,
    updateCategory,
    deleteCategory
}