import { Op } from 'sequelize';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const { name, id } = req.query;

    const filter = { where: {} };

    if (name) {
      filter.where.name = { [Op.like]: `%${name}%` };
    }

    if (id) {
      filter.where.id = { [Op.eq]: id };
    }

    const recipients = await Recipient.findAll({ ...filter });

    return res.status(200).json(recipients);
  }

  async store(req, res) {
    const { name, number, address, complement, state, city, zipCode } = req.body;

    const { id } = await Recipient.create({ name, number, address, complement, state, city, zipCode });

    return res.status(201).json({ id, name });
  }

  async update(req, res) {
    const { id } = req.params;

    const { name, number, address, complement, state, city, zipCode } = req.body;

    const recipient = await Recipient.findOne({ where: { id } });

    if (!recipient) {
      return res.status(404).json({ error: 'Recipient does not exist' });
    }

    await recipient.update({ name, number, address, complement, state, city, zipCode });

    return res.status(200).json(recipient);
  }

  async delete(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findOne({ where: { id } });

    if (!recipient) {
      return res.status(404).json({ error: 'Recipient does not exist' });
    }

    recipient.destroy();

    return res.status(204).send();
  }
}

export default new RecipientController();
