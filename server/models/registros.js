const mongoose = require('mongoose');
const { Schema } = mongoose;

const RegistroSchema = new Schema({
    nombre: { type: String, required: true },
    usuario: { type: String },
    contraseña: { type: String },
    rol: { type: String }
});

module.exports = mongoose.model('Registros', RegistroSchema, 'registros');