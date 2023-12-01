const express = require('express');
const router = express.Router();

const registrosCtrl = require('../controllers/registros.controller');

router.get('/getRegistros', registrosCtrl.getRegistros);

router.get('/getRegistro/:id', registrosCtrl.getRegistro);

router.post('/updateRegistro', registrosCtrl.uptadeRegistro);

router.get('/getEmpleados/:id', registrosCtrl.getEmpleados);

router.post('/updateEmpleado', registrosCtrl.updateEmpleado);

router.post('/deleteEmpleado', registrosCtrl.deleteEmpleado);

router.post('/login', registrosCtrl.login);

module.exports = router;