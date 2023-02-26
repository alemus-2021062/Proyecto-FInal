const {Schema, model} = require('mongoose');

const usuarioSchema = Schema({
        nombre: {
            type: String,
            required: [true, 'El nombre es obligatorio']
        },
        correo: {
            type: String,
            required: [true, 'El correo es obligatorio'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'La contraseña es obligatoria']
        },
        rol: {
            type: String,
            required: [true, 'El rol es obligatorio'],
            default: 'CLIENT'
        },
        estado: {
            type: Boolean,
            default: true
        }
})

module.exports = model('Usuario', usuarioSchema)