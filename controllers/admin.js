const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs')


const getAdmin = async (req = request, res = response) => {
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

const postAdmin = async (req = request, res = response) => {
    const { nombre, correo, password, rol } = req.body;
    const usuarioGuardadoDB = new Usuario({ nombre, correo, password, rol });

    const salt = bcrypt.genSaltSync();
    usuarioGuardadoDB.password = bcrypt.hashSync(password, salt);

    await usuarioGuardadoDB.save();

    res.json({
        msg: 'Usuario agregado',
        usuarioGuardadoDB
    })
}

const putAdmin = async (req = request, res = response) => {
    const  id  = req.usuario._id;
    const { _id, estado, rol, ...resto } = req.body;

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
}

const deleteAdmin = async (req = request, res = response) => {
    const id  = req.usuario._id;
    const usuarioEliminado = await Usuario.findByIdAndDelete(id);

    res.json({
        msg: 'Categoria Eliminada',
        usuarioEliminado
    })
}

module.exports = {
    getAdmin,
    postAdmin,
    putAdmin,
    deleteAdmin
} 