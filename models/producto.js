const {Schema, model} = require('mongoose');

const productoSchema = Schema({
        nombre: {
            type: String,
            required: [true, 'El nombre es obligatorio']
        },
        descripcion:{
            type: String,
            required: [true, 'La descipcion es obligatoria']
        },
        stock: {
            type: Number,
            required: [true, 'El stock es obligatorio']
        },
        categoria: {
            type: Schema.Types.ObjectId,
            ref: 'Categoria',
            required: true,
            default: 'productos varios'
        },
        estado: {
            type: Boolean,
            default: true
        }
})

module.exports = model('Producto', productoSchema)