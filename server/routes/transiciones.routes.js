const express = require('express');
const router = express.Router();

const transicionesCtrl = require('../controllers/transiciones.controller');

router.get('/getTransiciones', transicionesCtrl.getTransiciones);

router.post('/addTransicion', transicionesCtrl.addTransicion);

router.post('/deleteTransicion', transicionesCtrl.removeTransicion);

module.exports = router;




//EJEMPLOS

// const express = require('express');
// const router = express.Router();

// const contactCtrl = require('../controllers/contacts.controller');

// router.post('/getContacts', contactCtrl.getContacts);

// router.post('/',contactCtrl.createContact);

// router.get('/:id',contactCtrl.getContact);

// router.put('/:id',contactCtrl.editCotact);

// router.delete('/:id',contactCtrl.deleteContact);

// module.exports = router;