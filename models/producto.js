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
        precio: {
            type: Number,
            required: [true, 'El precio es obligatorio']
        },
        stock: {
            type: Number,
            required: [true, 'El stock es obligatorio']
        },
        vendido:{
            type: Number,
            required: [true, 'El numero de vendidos es obligatorio'],
            default: 0
        },
        categoria: {
            type: Schema.Types.ObjectId,
            ref: 'Categoria',
            required: true,
        },
        estado: {
            type: Boolean,
            default: true
        }
})

module.exports = model('Producto', productoSchema)