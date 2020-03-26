import * as Yup from 'yup';
import crypto from 'crypto';
import connection from '../database/connection';

export default {
  async index(req, res) {
    const ongs = await connection('ongs').select('*');

    return res.json(ongs);
  },

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .trim()
        .required()
        .max(200),
      email: Yup.string()
        .trim()
        .required()
        .max(200)
        .email(),
      whatsapp: Yup.string()
        .trim()
        .required()
        .max(200),
      city: Yup.string()
        .trim()
        .required()
        .max(200),
      uf: Yup.string()
        .trim()
        .required()
        .max(2),
    });

    await schema.validate(req.body);

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
