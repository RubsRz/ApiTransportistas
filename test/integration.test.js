
const request = require('supertest');
const app = require('../server/index');

describe('Pruebas de Integración', () => {
  test('debería obtener un registro por ID utilizando una solicitud HTTP completa', async () => {
    const idExistente = 'CR0002';

    const response = await request(app)
      .get(`/api/registros/getRegistro/${idExistente}`)
      .expect(200);
    expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining({ _id: idExistente })]));
  });
});
