import connection from '../database/connection';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Missing authorization header.' });
  }

  const ong = await connection('ongs')
    .where('id', authHeader)
    .select(['id', 'name'])
    .first();

  if (!ong) {
    return res.status(401).json({ error: 'Invalid ONG ID in authorization header.' });
  }

  req.ong = ong;
  return next();
};
