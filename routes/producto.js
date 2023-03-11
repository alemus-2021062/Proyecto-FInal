const {Router} = require('express');
const { check } = require('express-validator');
const { getProductos, postProducto, putProducto, deleteProducto, getProductoById, getProductosAgotados, getProductoMasVendido } = require('../controllers/producto')
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRol } = require('../middlewares/validar-role');
const router = Router();

router.get('/mostrar',[
    validarJWT,
], getProductos)

router.post('/mostrar/:id',[
    validarJWT,
    validarCampos,
    tieneRol('ADMIN'),
    check('id').isMongoId()
], getProductoById);

router.get('/agotado', [
    validarJWT,
    tieneRol('ADMIN'),
    validarCampos
], getProductosAgotados);

router.get('/masVendido', getProductoMasVendido);

router.post('/agregar', [
    validarJWT,
    tieneRol('ADMIN'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],postProducto)


router.put('/editar/:id', [
    validarJWT,
    tieneRol('ADMIN'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],putProducto)


router.delete('/eliminar/:id', [
    validarJWT,
    tieneRol('ADMIN'),
    validarCampos
],deleteProducto)

module.exports = router;