const { setRandomFallback } = require('bcryptjs');
const{ request, response} = require('express');
const Factura = require('../models/factura');
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const { matchedData } = require('express-validator');

const getFactura = async(req =request, res = response) =>{
    const query = {estado: true}
    const listaFacturas = await Promise.all([
        Factura.countDocuments(query),
        Factura.find(query).populate('producto', 'nombre').populate('usuario', 'nombre')
    ])
    res.json({
        msg: 'Mosrtar Facturas',
        listaFacturas
    })
}

const postFactura = async(req = request, res = response) =>{
    const {usuario, producto, cantidad} = req.body;
    const agregarFactura = new Factura({usuario, producto, cantidad})
    const min = 350;
    const max = 3510;
    agregarFactura.precioTotal = Math.floor(Math.random() * (max - min) + min)
    await agregarFactura.save();
    productosComprados.push(agregarFactura.producto)
    console.log(productosComprados);
    arrayFacturas.push(agregarFactura)
    res.json({
        msg: 'POST Factura',
        agregarFactura
    })
}

const arrayFacturas = [];

const productosComprados = [];

const facturasByIdUsuario = async(req = request, res = response) =>{
    const idUser = req.usuario._id
    const query = {estado:true, usuario: idUser}
    const listaFacturasById = await Promise.all([
        Factura.countDocuments(query),
        Factura.find(query)
    ])
    res.json({
        msg: 'Mosrtar Facturas',
        listaFacturasById
    })
}

const productosCompradosUsuario = async(req = request, res = response) =>{
    res.json({
        msg: `${productosComprados}`
    })
}

module.exports = {
    getFactura,
    postFactura,
    facturasByIdUsuario,
    productosCompradosUsuario
}