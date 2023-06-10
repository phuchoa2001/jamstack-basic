import { getData } from '../../db/content';

export default function handler(req, res) {
  res.status(200).json(getData());
}