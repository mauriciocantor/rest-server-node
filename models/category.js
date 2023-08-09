const {Schema, model} = require('mongoose')

const CategorySchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la categoria es obligatorio']
    },
    status: {
        type: Boolean,
        default: true,
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
    }
});

module.exports = model('Category', CategorySchema)