const express = require('express');
const router = express.Router();

const registrosCtrl = require('../controllers/registros.controller');

router.get('/getRegistros', registrosCtrl.getRegistros);

router.get('/getRegistro/:id', registrosCtrl.getRegistro);

router.post('/updateRegistro', registrosCtrl.uptadeRegistro);

// router.post('/addRegistros', registrosCtrl.addTransicion);
// router.post('/deleteRegistro', registrosCtrl.removeTransicion);

module.exports = router;