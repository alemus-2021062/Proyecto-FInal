const {Router} = require('express');
const { getFactura, postFactura, facturasByIdUsuario, productosCompradosUsuario } = require('../controllers/factura');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router(); 

router.get('/mostrar', getFactura);

router.post('/agregar',[
    validarJWT,
    validarCampos
], postFactura);

router.get('/facturasDeUsuario',[
    validarJWT,
    validarCampos
], facturasByIdUsuario);

router.get('/productosComprados', [
    validarJWT,
    validarCampos
], productosCompradosUsuario);

module.exports = router;