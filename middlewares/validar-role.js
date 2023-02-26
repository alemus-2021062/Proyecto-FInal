const {request, response} = require('express');

const tieneRol = (...roles)=>{
    return(req = request, res = response, next) =>{
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            })
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }
        next();

    }
}


const esAdminRole = (req = request, res = response, next) =>{
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        })
    }
    const {rol, nombre} = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(500).json({
            msg: `${nombre} no es Administrador - No tiene permisos a esta funcion`
        })
    }
}

module.exports = {
    tieneRol,
    esAdminRole
}