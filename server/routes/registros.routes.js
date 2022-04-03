const express = require('express');
const router = express.Router();

const registrosCtrl = require('../controllers/registros.controller');

router.get('/getRegistros', registrosCtrl.getTransiciones);

// router.post('/addRegistros', registrosCtrl.addTransicion);
// router.post('/deleteRegistro', registrosCtrl.removeTransicion);

module.exports = router;