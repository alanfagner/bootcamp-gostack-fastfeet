import { Op } from 'sequelize';

import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import DeliveryMan from '../models/DeliveryMan';
import File from '../models/File';

import NewDeliveryMail from '../jobs/NewDeliveryMail';
import Queue from '../../lib/Queue';

class DeliveryController {
  async index(req, res) {
    const { product, id } = req.query;

    const filter = { where: {} };

    if (product) {
      filter.where = { product: { [Op.like]: `%${product}%` } };
    }

    if (id) {
      filter.where = { id };
    }

    const deliveries = await Delivery.findAll({
      ...filter,
      attributes: ['id', 'canceledAt', 'startDate', 'endDate', 'product'],
      include: [
        { model: DeliveryMan, as: 'deliveryMan', attributes: ['id', 'name'] },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name', 'city', 'state', 'zipCode', 'address', 'number'],
        },
        { model: File, as: 'signature', attributes: ['url', 'path'] },
      ],
    });

    return res.status(200).json(deliveries);
  }

  async store(req, res) {
    const { recipientId, deliveryManId, product } = req.body;

    const recipient = await Recipient.findByPk(recipientId);

    if (!recipient) {
      return res.status(404).json({ error: 'Recipient does not exist' });
    }

    const deliverayMan = await DeliveryMan.findByPk(deliveryManId);

    if (!deliverayMan) {
      return res.status(404).json({ error: 'DeliveryMan does not exist' });
    }

    const delivery = await Delivery.create({ recipientId, deliveryManId, product });

    await Queue.add(NewDeliveryMail.key, { delivery, recipient, deliverayMan });

    return res.status(201).json({ id: delivery.id });
  }

  async update(req, res) {
    const { id } = req.params;

    const { recipientId, deliveryManId, product } = req.body;

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery does not exist' });
    }

    await delivery.update({ recipientId, deliveryManId, product });

    return res.status(201).json({ id: delivery.id });
  }

  async delete(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery does not exist' });
    }

    await delivery.destroy();

    return res.status(204).send();
  }
}

export default new DeliveryController();
