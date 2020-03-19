import { Op } from 'sequelize';
import DeliveryMan from '../models/DeliveryMan';
import Delivery from '../models/Delivery';
import File from '../models/File';

class DeliveryManController {
  async index(req, res) {
    const { name } = req.query;

    const { id } = req.params;

    const filter = { where: {} };

    if (name) {
      filter.where.name = { [Op.like]: `%${name}%` };
    }

    if (id) {
      filter.where.id = { [Op.eq]: id };
    }

    const deliverymans = await DeliveryMan.findAll({
      ...filter,
      attributes: ['id', 'name', 'email', 'createdAt'],
      include: [{ model: File, as: 'avatar', attributes: ['url', 'path'] }],
    });

    return res.status(200).json(deliverymans);
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryMan = await DeliveryMan.findOne({ where: { id } });

    if (!deliveryMan) {
      return res.status(404).json({ error: 'DeliveryMan does not exist' });
    }

    const count = await Delivery.findAll({ where: { deliveryManId: deliveryMan.id } });

    if (count && count.length > 0) {
      return res.status(400).json({ error: 'Have a delivery associate a this deliveryman' });
    }

    await deliveryMan.destroy();

    return res.status(204).send();
  }

  async store(req, res) {
    const { name, email } = req.body;

    const { originalname, filename } = req.file;

    const { id: avatarId, url } = await File.create({
      name: originalname,
      path: filename,
    });

    const { id } = await DeliveryMan.create({ name, email, avatarId });

    return res.status(201).json({ id, name, photo: url });
  }

  async update(req, res) {
    const { id } = req.params;

    const { name, email } = req.body;

    const deliveryMans = await DeliveryMan.findAll({ where: { id: { [Op.ne]: id }, email } });

    if (deliveryMans.length > 0) {
      return res.status(400).json({ error: 'this email already exist' });
    }

    const deliveryMan = await DeliveryMan.findOne({ where: { id } });

    if (!deliveryMan) {
      return res.status(404).json({ error: 'DeliveryMan does not exist' });
    }

    await deliveryMan.update({ name, email });

    return res.status(200).json({ deliveryMan });
  }
}

export default new DeliveryManController();
