const {Router} = require('express');
const { check } = require('express-validator');
const { getAdmin, postAdmin, putAdmin, deleteAdmin } = require('../controllers/admin');
const { esRoleValido } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRol } = require('../middlewares/validar-role');
const router = Router();

router.get('/mostrar',[
    validarJWT,
    tieneRol('ADMIN')
], getAdmin)


router.post('/agregar', [
    validarJWT,
    tieneRol('ADMIN'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('rol').custom(esRoleValido),
    validarCampos
],postAdmin)


router.put('/editar', [
    validarJWT,
    tieneRol('ADMIN'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],putAdmin)


router.delete('/eliminar', [
    validarJWT,
    tieneRol('ADMIN'),
    validarCampos
],deleteAdmin)


module.exports = router;