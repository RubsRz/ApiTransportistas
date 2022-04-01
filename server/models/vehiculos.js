const mongoose = require('mongoose');
const { Schema } = mongoose;

const VehiculoSchema = new Schema({
    marca: { type: String, required: true },
    modelo: { type: String },
    placa: { type: String },
    color: { type: String },
    conductor: { type: String }
    // id_user: { type: String, required: true },

});

module.exports = mongoose.model('Vehiculos', VehiculoSchema, 'vehiculos');