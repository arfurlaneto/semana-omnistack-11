import connection from '../database/connection';

export default {
  async index(req, res) {
    const incidents = await connection('incidents')
      .where('ong_id', req.ong.id)
      .select('*');

    return res.json(incidents);
  },
};
