const {Router} = require('express');
const { check } = require('express-validator');
const { getCategorias, postCategorias, putCategorias, deleteCategorias } = require('../controllers/categoria');
const { esRoleValido } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRol } = require('../middlewares/validar-role');
const router = Router();

router.get('/mostrar', getCategorias)

router.post('/agregar', [
    validarJWT,
    tieneRol('ADMIN'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], postCategorias)


router.put('/editar/:id', [
    validarJWT,
    tieneRol('ADMIN'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],getCategorias)



router.delete('/eliminar/:id', [
    validarJWT,
    tieneRol('ADMIN'),
    validarCampos
],deleteCategorias)

module.exports = router;