const Router = require('express');
const { getCarrito, postCarrito, añadirAlCarrito } = require('../controllers/carrito');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get('/mostrar', getCarrito);

router.post('/crear',[
    validarJWT,
    validarCampos
],postCarrito);

router.put('/anadir/:id',[
    validarJWT,
    validarCampos
], añadirAlCarrito);

module.exports = router