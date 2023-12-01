const request = require('supertest');
const app = require('../server/index'); 
const registro = require('../server/models/registros'); 

describe('registrosCtrl', () => {
  test('debería obtener un registro por ID', async () => {
    const registroExistente = await registro.find({ _id: 'CR0002' });

    const response = await request(app)
      .get(`/api/registros/getRegistro/${registroExistente[0]._id}`)
      .expect(200);

    // Asegúrate de que la respuesta contenga el registro correcto
    expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining({ _id: 'CR0002' })]));
  });

  test('debería manejar el caso en que no se encuentra el registro', async () => {
    const idNoExistente = 'idNoExistente';

    const response = await request(app)
      .get(`/api/registros/getRegistro/${idNoExistente}`)
      .expect(404);

    expect(response.body).toEqual({
      ok: false,
      msg: 'no se encontró ese registro con ese id',
    });
  });

  test('debería manejar errores internos', async () => {
    jest.spyOn(registro, 'find').mockImplementationOnce(() => {
      throw new Error('Simulando un error interno');
    });

    const response = await request(app)
      .get(`/api/registros/getRegistro/id`)
      .expect(500);
      
    expect(response.body).toEqual({
      ok: false,
      msg: 'fallo el obtener el registro.',
    });
  });
});
