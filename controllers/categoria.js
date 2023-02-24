const {response, request} = require('express');
const Categoria = require('../models/categoria');


const getCategorias = async(req = request, res = response) =>{
    const query = {estado:true};

    const listaCategorias = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
    ])

    res.json({
        msg : 'Mostrar Categoria',
        listaCategorias
    })
}

const postCategorias = async(req = request, res = response) =>{
    const { nombre, tipoCategoria, descripcion} = req.body;
    const categoriaGuardadaDB = new Categoria({nombre, tipoCategoria,descripcion});

    await categoriaGuardadaDB.save();

    res.json({
        msg: 'Categoria agregada',
        nombre,
        tipoCategoria,
        descripcion,
        categoriaGuardadaDB
    })
}

const putCategorias = async(req = request, res = response) =>{
    const {id} = req.params;
    const{_id, img, estado, ...resto} = req.body;

    const categoriaEditada = await Categoria.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'Categoria modificada',
        id,
        categoriaEditada
    })
}

const deleteCategorias = async(req = request, res = response) =>{
    const {id} = req.params;
    const categoriaEliminada = await Categoria.findByIdAndDelete(id);

    res.json({
        msg: 'Categoria Eliminada',
        categoriaEliminada
    })
}

module.exports ={
    getCategorias,
    postCategorias,
    putCategorias,
    deleteCategorias
} 