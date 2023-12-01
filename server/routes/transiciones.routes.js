const express = require('express');
const router = express.Router();

const transicionesCtrl = require('../controllers/transiciones.controller');

router.get('/getTransiciones', transicionesCtrl.getTransiciones);

router.get('/getTransicion/:conductorId', transicionesCtrl.getTransicion);

router.post('/addTransicion', transicionesCtrl.addTransicion);

router.post('/deleteTransicion', transicionesCtrl.removeTransicion);

module.exports = router;
