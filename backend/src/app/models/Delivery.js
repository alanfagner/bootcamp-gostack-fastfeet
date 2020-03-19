import Sequelize, { Model } from 'sequelize';

class Delivery extends Model {
  static init(sequelize) {
    super.init(
      {
        recipientId: { type: Sequelize.INTEGER, field: 'recipient_id' },
        deliveryManId: { type: Sequelize.INTEGER, field: 'deliveryman_id' },
        signatureId: { type: Sequelize.INTEGER, field: 'signature_id' },
        product: Sequelize.STRING,
        canceledAt: { type: Sequelize.DATE, field: 'canceled_at' },
        startDate: { type: Sequelize.DATE, field: 'start_date' },
        endDate: { type: Sequelize.DATE, field: 'end_date' },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.DeliveryMan, { foreignKey: 'deliveryman_id', as: 'deliveryMan' });
    this.belongsTo(models.Recipient, { foreignKey: 'recipient_id', as: 'recipient' });
    this.belongsTo(models.File, { foreignKey: 'signature_id', as: 'signature' });
  }
}

export default Delivery;
