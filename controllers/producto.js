const {response, request} = require('express');
const Producto = require('../models/producto');


const getProductos = async(req = request, res = response) =>{
    const query = {estado:true};

    const listaProductos = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query).populate('categoria', 'nombre')
    ])

    res.json({
        msg : 'Mostrar Productos',
        listaProductos
    })
}

const postProducto = async(req = request, res = response) =>{
    const { nombre, descripcion, stock, categoria} = req.body;
    const productoGuardadoDB = new Producto({nombre, descripcion, stock, categoria});

    await productoGuardadoDB.save();

    res.json({
        msg: 'Producto agregado',
        productoGuardadoDB
    })
}

const putProducto = async(req = request, res = response) =>{
    const {id} = req.params;
    const{_id, estado, ...resto} = req.body;

    const productoEditado = await Producto.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'Producto modificado',
        id,
        productoEditado
    })
}

const deleteProducto = async(req = request, res = response) =>{
    const {id} = req.params;
    const productoEliminado = await Producto.findByIdAndDelete(id);

    res.json({
        msg: 'Producto Eliminado',
        productoEliminado
    })
}

module.exports ={
    getProductos,
    postProducto,
    putProducto,
    deleteProducto
} 