import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';

class ProblemManager {
  async cancel(req, res) {
    const { id } = req.params;

    const problem = await DeliveryProblem.findByPk(id);

    if (!problem) {
      return res.status(404).json({ error: 'Delivery problem does not exist' });
    }

    const delivery = await Delivery.findByPk(problem.deliveryId);

    await delivery.update({ canceledAt: new Date() });

    return res.status(204).send();
  }
}

export default new ProblemManager();
