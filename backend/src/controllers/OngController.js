import crypto from 'crypto';
import connection from '../database/connection';

export default {
  async index(req, res) {
    const ongs = await connection('ongs').select('*');

    return res.json(ongs);
  },

  async store(req, res) {
    const {
      name, email, whatsapp, city, uf,
    } = req.body;

    const id = crypto.randomBytes(4).toString('HEX');

    await connection('ongs').insert({
      id, name, email, whatsapp, city, uf,
    });

    const ong = await connection('ongs')
      .where('id', id)
      .select('*')
      .first();

    return res.json(ong);
  },
};
