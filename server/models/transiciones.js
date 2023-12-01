const mongoose = require('mongoose');
const { Schema } = mongoose;

const TransicionSchema = new Schema({
    transicion: { type: String, required: true },
    conductorId: { type: String, required: false },
    vehiculoId: { type: String },
    fecha: { type: Date }
});

module.exports = mongoose.model('Transiciones', TransicionSchema, 'transiciones');