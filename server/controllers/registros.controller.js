const registro = require('../models/registros');
const registrosCtrl = {};


registrosCtrl.getRegistros = async(req, res) => {
    const registrosList = await registro.find();
    res.json(registrosList);
};

registrosCtrl.getRegistro = async(req, res) => {
    const find = await transicion.find({ '_id': req.params.id });
    res.json(find);
};

registrosCtrl.uptadeRegistro = async(req, res) => {
    let body = req.body;
    console.log("body:", body);
    await registro.findByIdAndUpdate(body.id, { $set: { imagen: body.imagen } })
    res.json({ res: "Imagen Actualizada" });
}




module.exports = registrosCtrl;