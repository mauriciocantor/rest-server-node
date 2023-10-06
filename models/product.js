const {Schema, model} = require('mongoose')

const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la categoria es obligatorio']
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    price:{
        type: Number,
        default: 0
    },
    description:{
        type: String
    },
    available:{
        type: Boolean,
        default: true
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userModifier: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    img: {
        type: String
    }
});

ProductSchema.methods.toJSON = function (){
    const {__v, status, ...data } = this.toObject();
    return data;
}

module.exports = model('product', ProductSchema);