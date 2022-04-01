const mongoose = require('mongoose');
const { Schema } = mongoose;

const TransicionSchema = new Schema({
    transicion: { type: String, required: true },
    hora: { type: Date },
    id_vehiculo: { type: Number }
});

module.exports = mongoose.model('Transiciones', TransicionSchema, 'transiciones');