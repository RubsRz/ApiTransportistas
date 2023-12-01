// functional.test.js
const request = require('supertest');
const app = require('../server/index'); // Reemplaza con la ruta correcta de tu aplicación Express

describe('Pruebas Funcionales', () => {
  test('debería actualizar un registro mediante una solicitud HTTP POST', async () => {
    // Simula un ID existente y datos de registro actualizados
    const idExistente = 'CR0009';
    const datosActualizados = {
      nombre: 'Patricia',
      apellidos: 'Hernández',
      usuario: 'paty7888',
      rol: 'conductor',
      birth: '1990-01-01',
      email: 'paty@example.com',
      genero: 'femenino',
      id_boss: 'AD0002',
      id_vehiculo: 'VH0009',
      vehiculo_marca: 'Hyundai',
      vehiculo_modelo: 'Elantra',
      vehiculo_anio: 2022,
    };

    const response = await request(app)
      .post('/api/registros/updateEmpleado')
      .send({ id: idExistente, ...datosActualizados })
      .expect(200);

    // Asegúrate de que la respuesta contenga la información esperada
    // (ajusta según la estructura de tu respuesta)
    expect(response.body).toEqual(expect.objectContaining({res: 'Empleado actualizado'}));
});
});
