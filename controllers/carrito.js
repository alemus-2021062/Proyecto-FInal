const { request, response } = require('express');
const Carrito = require('../models/carrito');
const Usuario = require('../models/usuario')

const getCarrito = async (req = request, res = response) => {
    const query = { estado: true }
    const listaCarritos = await Promise.all([
        Carrito.countDocuments(querry),
        Carrito.find(query).populate('usuario', 'nombre').populate('producto', 'nombre')
    ])
    res.json({
        msg: 'Mostrar Carritos',
        listaCarritos
    })
}

const postCarrito = async (req = request, res = response) => {

    const uid = req.body.usuario

    const buscarCarrito = await Carrito.findOne({ usuario: uid })

    if (!buscarCarrito) {
        const {usuario, producto, cantidad } = req.body;
        const añadirCarrito = new Carrito({ usuario, producto, cantidad })
        await añadirCarrito.save();
        res.json({
            msg: 'POST Carrito de compras',
            añadirCarrito
        })
    }else{
        res.json({
            msg: 'Ya tienes un carrito'
        })
    }
}

const añadirAlCarrito = async(req = request, res = response) =>{
    const {id} = req.params
    const {_id, estado, ...resto} = req.body;
    const añadirProducto = await Carrito.findByIdAndUpdate(id, resto)

    res.json({
        msg: 'Añadiendo producto al carrito',
        añadirProducto
    })
}


module.exports = {
    getCarrito,
    postCarrito,
    añadirAlCarrito
}