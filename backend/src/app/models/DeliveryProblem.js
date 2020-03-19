import Sequelize, { Model } from 'sequelize';

class DeliveryProblem extends Model {
  static init(sequelize) {
    super.init(
      {
        deliveryId: { type: Sequelize.INTEGER, field: 'delivery_id' },
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Delivery, { foreignKey: 'delivery_id', as: 'delivery' });
  }
}

export default DeliveryProblem;
