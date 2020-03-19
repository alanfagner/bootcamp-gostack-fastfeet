import { setHours, setMinutes, setSeconds, isWithinInterval, startOfDay, endOfDay } from 'date-fns';

import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import File from '../models/File';

class DeliveryManagerController {
  async index(req, res) {
    const { id } = req.params;

    const { delivered, canceled } = req.query;

    const filter = { deliveryManId: id };

    if (delivered !== undefined)
      if (delivered === 'true') {
        filter.endDate = { [Op.ne]: null };
      } else {
        filter.endDate = { [Op.eq]: null };
      }

    if (canceled !== undefined)
      if (canceled === 'true') {
        filter.canceledAt = { [Op.ne]: null };
      } else {
        filter.canceledAt = { [Op.eq]: null };
      }

    const deliveries = await Delivery.findAll({
      where: { ...filter },
      attributes: ['id', 'product', 'createdAt', 'startDate', 'endDate'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name', 'city', 'state', 'zipCode', 'address', 'number'],
        },
      ],
    });

    return res.status(200).json(deliveries);
  }

  async end(req, res) {
    const { deliveryId, deliveryManId } = req.params;

    const { originalname, filename } = req.file;

    const { id: signatureId } = await File.create({
      name: originalname,
      path: filename,
    });

    const dateNow = new Date();

    const delivery = await Delivery.findOne({
      where: { id: deliveryId, deliveryManId },
      include: [
        { model: Recipient, as: 'recipient' },
        { model: File, as: 'signature' },
      ],
    });

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery does not exist' });
    }

    if (!delivery.startDate) {
      return res.status(400).json({ error: 'Delivery has already started' });
    }

    if (delivery.endDate) {
      return res.status(400).json({ error: 'Delivery has already finalized' });
    }

    await delivery.update({ endDate: dateNow, signatureId });

    return res.status(200).send({ delivery });
  }

  async start(req, res) {
    const { deliveryId, deliveryManId } = req.params;

    const dateNow = new Date();

    const startDelivery = setHours(setMinutes(setSeconds(new Date(), 0), 0), 9);
    const endDelivery = setHours(setMinutes(setSeconds(new Date(), 0), 0), 18);

    const isAvaliable = isWithinInterval(dateNow, { start: startDelivery, end: endDelivery });

    if (!isAvaliable) {
      return res.status(401).json({ error: 'You can only deliver between 09:00 and 18:00' });
    }

    const delivery = await Delivery.findOne({
      where: { id: deliveryId, deliveryManId },
      include: [{ model: Recipient, as: 'recipient' }],
    });

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery does not exist' });
    }

    if (delivery.startDate) {
      return res.status(400).json({ error: 'Delivery has already started' });
    }

    const startDay = startOfDay(dateNow);
    const endDay = endOfDay(dateNow);

    const deliveries = await Delivery.findAll({
      where: { deliveryManId, startDate: { [Op.between]: [startDay, endDay] } },
    });

    if (deliveries.length >= 5) {
      return res.status(400).json({ error: 'You have exceeded o limite 5 delivery' });
    }

    await delivery.update({ startDate: dateNow });

    return res.status(200).send({ delivery });
  }
}

export default new DeliveryManagerController();
