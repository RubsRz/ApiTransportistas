const bcrypt = require('bcrypt');
const registro = require('../models/registros');
const registrosCtrl = {};


registrosCtrl.getRegistros = async(req, res) => {
    const registrosList = await registro.find().lean();
    res.json(registrosList);
};

registrosCtrl.login = async(req, res) => {
    const { username, password } = req.body;

    console.log(username, password)

    // Buscar al usuario en la base de datos
    const user = await registro.findOne({ usuario: username }).lean();

    if (!user) {
        // Si el usuario no existe, enviar una respuesta con un error
        res.json({ success: false, message: 'Usuario no encontrado' });
    } else {
        // Si el usuario existe, comparar la contraseña proporcionada con la contraseña hasheada
        const match = await bcrypt.compare(password, user.contraseña);

        if (match) {
            // Si las contraseñas coinciden, enviar una respuesta con los datos del usuario
            res.json({ success: true, data: user });
        } else {
            // Si las contraseñas no coinciden, enviar una respuesta con un error
            res.json({ success: false, message: 'Contraseña incorrecta' });
        }
    }
};




registrosCtrl.getRegistro = async (req, res) => {
    try {
      const empleado = await registro.aggregate([
        {
          $match: { '_id': req.params.id }
        },
        {
          $lookup: {
            from: 'vehiculos',
            localField: 'id_vehiculo',
            foreignField: '_id',
            as: 'vehiculo_info'
          }
        },
        {
          $unwind: '$vehiculo_info'
        },
        {
          $addFields: {
            vehiculo_marca: '$vehiculo_info.marca',
            vehiculo_modelo: '$vehiculo_info.modelo',
            vehiculo_anio: '$vehiculo_info.año',
            vehiculo_placas: '$vehiculo_info.placas',
            vehiculo_color: '$vehiculo_info.color',
            // Agrega aquí cualquier otro campo del vehículo que quieras incluir
          }
        },
        {
          $project: {
            imagen: 0,
            contraseña: 0,
            vehiculo_info: 0 // Esto excluye el campo 'vehiculo_info' original
          }
        }
      ]);
  
      if (!empleado[0]) {
        return res.status(404).json({
          ok: false,
          msg: "No se encontró ese registro con ese id"
        });
      }
  
      return res.status(200).json(empleado[0]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        ok: false,
        msg: "Fallo al obtener el registro."
      });
    }
  };
  
  

registrosCtrl.uptadeRegistro = async(req, res) => {
    let body = req.body;
    console.log("body:", body);
    await registro.findByIdAndUpdate(body.id, { $set: { imagen: body.imagen } })
    res.json({ res: "Imagen Actualizada" });
}

registrosCtrl.getEmpleados = async(req, res) => {
    const id_boss = req.params.id;
    console.log(id_boss);
    
    const empleados = await registro.aggregate([
        {
            $match: { id_boss: id_boss } // solo considera los documentos donde id_boss sea igual al proporcionado
        },
        {
            $lookup:
            {
                from: "vehiculos", // nombre de la colección con la que quieres hacer join
                localField: "id_vehiculo",
                foreignField: "_id",
                as: "vehiculo_info"
            }
        },
        { $unwind: "$vehiculo_info" }, // desglosa los elementos del array 'vehiculo_info'
        {
            $addFields: {
                "vehiculo_marca": "$vehiculo_info.marca",
                "vehiculo_modelo": "$vehiculo_info.modelo",
                "vehiculo_anio": "$vehiculo_info.año",
                // agrega aquí cualquier otro campo del vehículo que quieras incluir
            }
        },
        {
            $project: {
                imagen: 0,
                contraseña: 0,
                vehiculo_info: 0 // esto excluye el campo 'vehiculo_info' original
            }
        }
    ]);
    res.json(empleados);
}

registrosCtrl.updateEmpleado = async (req, res) => {
    try {
        let body = req.body;
        console.log("body:", body);

        const updateFields = {
            nombre: body.nombre,
            apellidos: body.apellidos,
            usuario: body.usuario,
            rol: body.rol,
            birth: body.birth,
            email: body.email,
            genero: body.genero,
            id_boss: body.id_boss,
            id_vehiculo: body.id_vehiculo,
        };

        await registro.updateOne({ _id: body._id }, { $set: updateFields });

        res.json({ res: "Empleado actualizado" });
    } catch (error) {
        console.log(error);
        console.log(error.message);
    }
}

registrosCtrl.deleteEmpleado = async (req, res) => {
    try {
        const empleadoId = req.body._id;

        console.log(req.body)

        const result = await registro.deleteOne({ _id: empleadoId });

        if (result.deletedCount === 1) {
            res.json({ res: "Empleado eliminado" });
        } else {
            res.json({ res: "Empleado no encontrado" });
        }
    } catch (error) {
        console.log(error);
        console.log(error.message);
    }
}



module.exports = registrosCtrl;