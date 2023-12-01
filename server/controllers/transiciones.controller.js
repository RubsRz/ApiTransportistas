const transicion = require('../models/transiciones');
const transicionesCtrl = {};
const moment = require('moment-timezone');




transicionesCtrl.getTransiciones = async(req, res) => {
    const transicionesList = await transicion.find();
    res.json(transicionesList);
};


transicionesCtrl.getTransicion = async(req, res) => {
    let find = await transicion.aggregate([
        { $match: { 'conductorId': req.params.conductorId } },
        { $sort: { fecha: -1 } },
        {
            $lookup: {
                from: "registros",
                localField: "conductorId",
                foreignField: "_id",
                as: "registro"
            }
        },
        { $unwind: "$registro" },
        {
            $lookup: {
                from: "vehiculos",
                localField: "vehiculoId",
                foreignField: "_id",
                as: "vehiculo"
            }
        },
        { $unwind: "$vehiculo" }, // desenrollar el array de vehiculo
        {
            $addFields: {
                "Rnombre": "$registro.nombre",
                "Rapellidos": "$registro.apellidos",
                "Vmarca": "$vehiculo.marca",
                "Vmodelo": "$vehiculo.modelo",
                "Vanio": "$vehiculo.año",
                "Vcolor": "$vehiculo.color",
                "Vplacas": "$vehiculo.placas"
            }
        },
        { $unset: ["registro", "vehiculo"] } 
    ]);

    // Cambiar el formato de la fecha
    find = find.map(transicion => {
        let transicionObj = transicion;
        transicionObj.fecha = moment(transicionObj.fecha).tz('America/Mexico_City').format('DD/MM/YYYY hh:mm A');
        return transicionObj;
    });

    console.log(find)

    res.json(find);
};






transicionesCtrl.addTransicion = async(req, res) => {
    const fechaLocal = new Date(req.body.fecha);

    const newTransicion = new transicion({
        transicion: req.body.transicion,
        fecha: fechaLocal,
        conductorId: req.body.conductorId,
        vehiculoId: req.body.vehiculoId,
    });
    
    await newTransicion.save();
    res.json({
        'status': 'Transicion Guardada'
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