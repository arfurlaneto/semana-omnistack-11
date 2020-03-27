import request from 'supertest';
import app from '../../src/app';
import connection from '../../src/database/connection';

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new ONG.', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: 'Associação de Proteção aos Animais',
        email: 'apa@apa.gov',
        whatsapp: 9999999999,
        city: 'Sorocaba',
        uf: 'SP',
      });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});
