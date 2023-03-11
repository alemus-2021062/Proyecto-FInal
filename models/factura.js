const { Schema, model } = require("mongoose")

const facturaSchema = Schema({
    fecha: {
        type: Date,
        default: Date.now
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El Usuario es obligatorio']
    },
    producto:[{
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: [true, 'El o los productos son obligatorios']
    }],
    cantidad: [{
        type: Schema.Types.Number,
        ref: 'Producto',
        required: [true, 'Las cantidades son obligatorias']
    }],
    precioTotal:{
        type: Schema.Types.Number,
        ref: 'Producto',
        default: 0
    },
    estado:{
        type: Boolean,
        default: true
    }
})

module.exports = model('Factura', facturaSchema)