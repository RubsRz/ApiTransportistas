const transicion = require('../models/transiciones');
const transicionesCtrl = {};


transicionesCtrl.getTransiciones = async(req, res) => {
    const transicionesList = await transicion.find();
    res.json(transicionesList);
};

transicionesCtrl.addTransicion = async(req, res) => {
    const newTrancision = new transicion({
        transicion: req.body.transicion,
        hora: req.body.hora,
        id_vehiculo: req.body.id_vehiculo,
    });
    await newTrancision.save();
    res.json({
        'status': 'Transicion saved'
    });
};

transicionesCtrl.removeTransicion = async(req, res) => {
    let id = req.body.id
    await fruta.findByIdAndRemove(id);
    res.json({
        status: 'Transicion deleted'
    });
};

module.exports = transicionesCtrl;