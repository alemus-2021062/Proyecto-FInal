const {Router} = require('express');
const { check } = require('express-validator');
const { getClient, postClient, putClient, deleteClient, deleteClientById, putClientById } = require('../controllers/client')
const { esRoleValido, emailExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRol } = require('../middlewares/validar-role');
const router = Router();

router.get('/mostrar',[
    validarJWT,
    tieneRol('ADMIN')
], getClient)


router.post('/agregar', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').isEmail(),
    check('correo').custom(emailExiste),
    check('password', 'La password es obligatoria'),
    validarCampos
],postClient)

router.put('/editar/:id', [
    validarJWT,
    tieneRol('ADMIN'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La password es obligatoria'),
    validarCampos
],putClientById);

router.put('/editar/cliente', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La password es obligatoria'),
    validarCampos
],putClient)

router.delete('/eliminar/:id',[
    validarJWT,
    tieneRol('ADMIN'),
    check('id').isMongoId()
], 
deleteClientById);

router.delete('/eliminar/cliente', [
    validarJWT,
    tieneRol('ADMIN', 'CLIENT'),
    validarCampos
],deleteClient)

module.exports = router;