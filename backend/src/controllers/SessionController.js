import * as Yup from 'yup';
import connection from '../database/connection';

export default {
  async store(req, res) {
    const schema = Yup.object().shape({
      id: Yup.string()
        .trim()
        .required()
        .max(200),
    });

    await schema.validate(req.body);

    const { id } = req.body;

    const ong = await connection('ongs')
      .where('id', id)
      .select(['id', 'name'])
      .first();

    if (!ong) {
      return res.status(400).json({ error: 'No ONG found with this ID.' });
    }

    return res.json(ong);
  },
};
