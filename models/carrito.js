const {Schema, model} = require('mongoose');

const carritoSchema = Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        //required: true,
        unique: true
    },
    producto: [{
        type: Schema.Types.ObjectId,
        ref: 'Producto',
    }],
    cantidad:[{
        type: Schema.Types.Number,
        ref: 'Producto',
        default: 1
    }],
    estado: {
        type: Boolean,
        default: true
    }
})

module.exports = model('Carrito', carritoSchema);