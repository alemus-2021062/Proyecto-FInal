const {Router} = require('express');
const { check } = require('express-validator');
const { getUsuarios, postUsuario, putUsuario, deleteUsuario } = require('../controllers/usuario')
const { esRoleValido } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRol } = require('../middlewares/validar-role');
const router = Router();

router.get('/mostrar',[
    validarJWT,
    tieneRol('ADMIN')
], getUsuarios)


router.post('/agregar', [
    validarJWT,
    tieneRol('ADMIN'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('rol').custom(esRoleValido),
    validarCampos
],postUsuario)


router.put('/editar/:id', [
    validarJWT,
    tieneRol('ADMIN'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('rol').custom(esRoleValido),
    validarCampos
],putUsuario)


router.delete('/eliminar/:id', [
    validarJWT,
    tieneRol('ADMIN'),
    check('rol').custom(esRoleValido),
    validarCampos
],deleteUsuario)

module.exports = router;