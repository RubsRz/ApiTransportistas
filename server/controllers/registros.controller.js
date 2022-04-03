const regsitro = require('../models/registros');
const registrosCtrl = {};


registrosCtrl.getTransiciones = async(req, res) => {
    const registrosList = await regsitro.find();
    res.json(registrosList);
};

module.exports = registrosCtrl;