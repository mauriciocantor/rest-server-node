const Product = require('./../models/product');

const productExist = async (id) => {
    const product = await Product.findById(id);
    if(!product){
        throw new Error(`No existe un Producto con el ID ${id}`);
    }

}

module.exports = {
    productExist
}