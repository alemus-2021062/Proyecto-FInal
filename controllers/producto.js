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

const getProductoMasVendido = async(req = request, res = response) =>{
    const query = {estado: true}
    const listaProductos = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query).sort({vendido: -1}).populate('categoria', 'nombre')
    ])
    res.json({
        msg: 'Mostrar Productos mas vendidos',
        listaProductos
    })
}

const getProductoById = async(req = request, res = response) => {
    const {id} = req.params;
    const query = {estado:true, _id: id};
    const productoById = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query).populate('categoria', 'nombre')
    ])
    res.json({
        msg: 'Mostrar Producto Especifico',
        productoById
    })
}

const getProductosAgotados = async(req = request, res = response) =>{
    const query = {estado:false, stock:0 };
    const productoAgotado = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query).populate('categoria', 'nombre'),
        Producto.updateMany({ categoria: { $exists: true } }, { $set: 'Productos varios' })
    ])
    res.json({
        msg: 'Mostrar Productos agotado',
        productoAgotado
    })
}

const postProducto = async(req = request, res = response) =>{
    const { nombre, descripcion, precio, stock, vendido, categoria} = req.body;
    const productoGuardadoDB = new Producto({nombre, descripcion, precio, stock,vendido,  categoria});
    await productoGuardadoDB.save();
    res.json({
        msg: 'Producto agregado',
        productoGuardadoDB
    })
}

const putProducto = async(req = request, res = response) =>{
    const {id} = req.params;
    const{_id, estado, ...resto} = req.body;
    const productoEditado = await Producto.findByIdAndUpdate(id, resto,{new:true});
    res.json({
        msg: 'Producto modificado',
        id,
        productoEditado
    })
}

const deleteProducto = async(req = request, res = response) =>{
    const {id} = req.params;
    const productoEliminado = await Producto.findByIdAndUpdate(id, {estado:false, stock: 0});
    res.json({
        msg: 'Producto Eliminado',
        productoEliminado
    })
}

module.exports ={
    getProductos,
    getProductoById,
    getProductosAgotados,
    getProductoMasVendido,
    postProducto,
    putProducto,
    deleteProducto,
} 