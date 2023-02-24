const {Router} = require('express');
const { check } = require('express-validator');
const { getProductos, postProducto, putProducto, deleteProducto } = require('../controllers/producto')
const { esRoleValido } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRol } = require('../middlewares/validar-role');
const router = Router();

router.get('/mostrar', getProductos)


router.post('/agregar', [
    validarJWT,
    tieneRol('ADMIN'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('rol').custom(esRoleValido),
    validarCampos
],postProducto)


router.put('/editar/:id', [
    validarJWT,
    tieneRol('ADMIN'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('rol').custom(esRoleValido),
    validarCampos
],putProducto)


router.delete('/eliminar/:id', [
    validarJWT,
    tieneRol('ADMIN'),
    check('rol').custom(esRoleValido),
    validarCampos
],deleteProducto)

module.exports = router;