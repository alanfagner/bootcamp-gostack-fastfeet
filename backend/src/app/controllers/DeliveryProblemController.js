import { Op } from 'sequelize';
import DeliveryProblem from '../models/DeliveryProblem';

class DeliveryProblemController {
  async index(req, res) {
    const { id } = req.params;

    const filter = { where: {} };

    if (id) {
      filter.where.deliveryId = { [Op.eq]: id };
    }

    const deliveryProblem = await DeliveryProblem.findAll({
      ...filter,
      attributes: ['deliveryId', 'description', 'id', 'createdAt'],
    });

    return res.status(200).json(deliveryProblem);
  }

  async store(req, res) {
    const { id } = req.params;
    const { description } = req.body;

    const deliveryProblem = await DeliveryProblem.create({ description, deliveryId: id });

    return res.status(201).json({ id: deliveryProblem.id });
  }
}
export default new DeliveryProblemController();
