const transicion = require('../models/transiciones');
const transicionesCtrl = {};


transicionesCtrl.getTransiciones = async(req, res) => {
    const transicionesList = await transicion.find();
    res.json(transicionesList);
};

transicionesCtrl.getTransicion = async(req, res) => {
    const find = await transicion.find({ 'vehiculoId': req.params.vehiculoId });
    res.json(find);
};

transicionesCtrl.addTransicion = async(req, res) => {
    console.log(req.body.fecha)
    const newTransicion = new transicion({
        transicion: req.body.transicion,
        fecha: req.body.fecha,
        vehiculoId: req.body.vehiculoId,
    });
    console.log(newTransicion);
    await newTransicion.save();
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