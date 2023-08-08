const Category = require('./../models/category');

const categoryExist = async (id) => {
    const category = await Category.findById(id);
    if(!category){
        throw new Error(`No existe una categoria con el ID ${id}`);
    }

}

module.exports = {
    categoryExist
}