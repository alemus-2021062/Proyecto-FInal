const Producto = require('../models/producto');
const Role = require('../models/role');
const Admin = require('../models/usuario');

const esRoleValido = async(rol = '') =>{
    const existeRol = await Role.findOne( { rol } );

    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la DB`);
    }
}

const emailExiste = async( correo = '' ) => {

    //Verificamos si el correo ya existe en la DB
    const existeEmail = await Admin.findOne( { correo } );

    //Si existe (es true) lanzamos excepción
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo } ya existe y esta registrado en la DB`);
    }

}

const existeProductoPorId = async(id) => {

    //Verificar si el ID existe
    const existeProducto = await Producto.findById(id);

    if ( !existeProd ) {
        throw new Error(`El id ${ id } no existe en la DB`);
    }

}

const existeCategoriaPorId = async(id) => {

    //Verificar si el ID existe
    const existeCategoria = await Categoria.findById(id);

    if ( !existeCat ) {
        throw new Error(`El id ${ id } no existe en la DB`);
    }

}

const existeAdminPorId = async(id) => {

    //Verificar si el ID existe
    const existeUsuario = await Admin.findById(id);

    if ( !existeUser ) {
        throw new Error(`El id ${ id } no existe en la DB`);
    }

}


module.exports = {
    esRoleValido,
    emailExiste,
    existeProductoPorId,
    existeCategoriaPorId,
    existeAdminPorId
}