import Mail from '../../lib/Mail';

class NewDeliveryMail {
  get key() {
    return 'NewDeliveryMail';
  }

  async handle({ data }) {
    const { delivery, recipient, deliverayMan } = data;

    await Mail.sendMail({
      to: `${deliverayMan.name} <${deliverayMan.email}>`,
      subject: 'Nova entrega !',
      template: 'newDelivery',
      context: {
        deliveryName: deliverayMan.name,
        name: recipient.name,
        product: delivery.product,
        address: recipient.address,
        number: recipient.number,
        complement: recipient.complement,
        city: recipient.city,
        state: recipient.state,
        zipCode: recipient.zipCode,
      },
    });
  }
}

export default new NewDeliveryMail();
