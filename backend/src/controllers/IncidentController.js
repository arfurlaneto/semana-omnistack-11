import * as Yup from 'yup';
import connection from '../database/connection';

export default {
  async index(req, res) {
    const { page = 1 } = req.query;

    const [count] = await connection('incidents').count();

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf',
      ]);

    res.header('X-Total-Count', count['count(*)']);

    return res.json(incidents);
  },

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string()
        .trim()
        .required()
        .max(200),
      description: Yup.string()
        .trim()
        .required()
        .max(200),
      value: Yup
        .number()
        .required(),
    });

    await schema.validate(req.body);

    const {
      title, description, value,
    } = req.body;

    const [id] = await connection('incidents').insert({
      title, description, value, ong_id: req.ong.id,
    });

    const incident = await connection('incidents')
      .where('id', id)
      .select('*')
      .first();

    return res.json(incident);
  },

  async destroy(request, response) {
    const { id } = request.params;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if (incident.ong_id !== request.ong.id) {
      return response.status(401).json({ error: 'Operation not allowed.' });
    }

    await connection('incidents').where('id', id).delete();

    return response.status(204).send();
  },
};
