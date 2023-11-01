const mongoose = require('mongoose');
const { Schema } = mongoose;

const RegistroSchema = new Schema({
    _id: { type: String, required: true }, // Usar String en lugar de ObjectId
    nombre: { type: String, required: true },
    apellidos: { type: String },
    usuario: { type: String },
    contraseña: { type: String },
    rol: { type: String },
    imagen: { type: String },
    birth: { type: String },
    email: { type: String },
    genero: { type: String },
    id_boss: { type: String },
    id_vehiculo: { type: String },
});

module.exports = mongoose.model('Registros', RegistroSchema, 'registros');