const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs')


const getClient = async (req = request, res = response) => {
    const query = { estado: true };

    const listaUsuarios = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
    ])

    res.json({
        msg: 'Mostrar Usuario',
        listaUsuarios
    })
}

const postClient = async (req = request, res = response) => {
    const { nombre, correo, password } = req.body;
    const usuarioGuardadoDB = new Usuario({ nombre, correo, password });

    const salt = bcrypt.genSaltSync();
    usuarioGuardadoDB.password = bcrypt.hashSync(password, salt);

    await usuarioGuardadoDB.save();

    res.json({
        msg: 'Usuario agregado',
        usuarioGuardadoDB
    })
}

const putClient = async (req = request, res = response) => {
    const  idCliente  = req.usuario._id;
    const { _id, estado, rol, ...resto } = req.body;

    if (resto.password) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(resto.password, salt);
    }

    const usuarioEditado = await Usuario.findByIdAndUpdate(idCliente, resto);

    res.json({
        msg: 'Usuario modificado',
        idCliente,
        usuarioEditado
    })
}

const putClientById = async (req = request, res = response) => {
    const  {id}  = req.params;
    const { _id, estado, rol, ...resto } = req.body;
    const usuarioAdmin = await Usuario.findById(req.params.id)

    if (usuarioAdmin.rol !=='ADMIN') {
        if (resto.password) {
            const salt = bcrypt.genSaltSync();
            resto.password = bcrypt.hashSync(resto.password, salt);
        }
    
        const usuarioEditado = await Usuario.findByIdAndUpdate(id, resto);
    
        res.json({
            msg: 'Usuario modificado',
            id,
            usuarioEditado
        })
    }else{
        res.status(201).json({
            msg: 'No puedes editar a otro administrador'
        })
    }   
}


const deleteClient = async (req = request, res = response) => {
    const  id  = req.usuario._id;
    const usuarioEliminado = await Usuario.findByIdAndDelete(id);

    res.json({
        msg: 'Categoria Eliminada',
        usuarioEliminado
    })
}

const deleteClientById = async (req = request, res = response) => {
    const  {id}  = req.params;
    const usuarioAdmin = await Usuario.findById(req.params.id)

    if (usuarioAdmin.rol !=='ADMIN') {
        const usuarioEliminado = await Usuario.findByIdAndDelete(id);
        res.json({
            msg: 'Categoria Eliminada',
            usuarioEliminado
        })
    }else{
        res.status(201).json({
            msg: 'No puedes eliminar a otro administrador'
        })
    }
}


module.exports = {
    getClient,
    postClient,
    putClient,
    deleteClient,
    putClientById,
    deleteClientById
} 