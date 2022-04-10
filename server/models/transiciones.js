const mongoose = require('mongoose');
const { Schema } = mongoose;

const TransicionSchema = new Schema({
    transicion: { type: String, required: true },
    fecha: { type: Date },
    vehiculoId: { type: String }
});

module.exports = mongoose.model('Transiciones', TransicionSchema, 'transiciones');