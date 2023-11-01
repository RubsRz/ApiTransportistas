const vehiculo = require('../models/vehiculos');
const vehiculosCtrl = {};


vehiculosCtrl.getVehiculos = async(req, res) => {
    const vehiculosList = await vehiculo.find();
    res.json(vehiculosList);
};

vehiculosCtrl.getEmptyVehiculos = async (req, res) => {
    try {
      const vehiculos = await vehiculo.aggregate([
        {
          $lookup: {
            from: "registros",
            localField: "_id",
            foreignField: "id_vehiculo",
            as: "registros"
          }
        },
        {
          $match: {
            registros: { $size: 0 } // Filtrar vehículos sin registros relacionados
          }
        },
        {
          $project: {
            registros: 0 // Excluye el campo 'registros' del resultado
          }
        }
      ]);
      res.json(vehiculos);
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor' });
    }
  };
  

// transicionesCtrl.addTransicion = async(req, res) => {
//     const newTrancision = new transicion({
//         transicion: req.body.transicion,
//         hora: req.body.hora,
//         id_vehiculo: req.body.id_vehiculo,
//     });
//     await newTrancision.save();
//     res.json({
//         'status': 'Transicion saved'
//     });
// };

// transicionesCtrl.removeTransicion = async(req, res) => {
//     let id = req.body.id
//     await fruta.findByIdAndRemove(id);
//     res.json({
//         status: 'Transicion deleted'
//     });
// };

module.exports = vehiculosCtrl;