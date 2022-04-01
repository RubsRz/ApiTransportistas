const express = require('express');
const router = express.Router();

const vehiculosCtrl = require('../controllers/vehiculos.controller');

router.get('/getVehiculos', vehiculosCtrl.getVehiculos);

// router.post('/addTransicion', transicionesCtrl.addTransicion);

// router.post('/deleteTransicion', transicionesCtrl.removeTransicion);

module.exports = router;