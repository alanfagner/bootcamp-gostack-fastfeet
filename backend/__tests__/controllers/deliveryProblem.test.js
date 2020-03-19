import request from 'supertest';

import trucate from '../util/trucate';
import app from '../../src/app';
import factory from '../factories';
import createUserToken from '../util/createUserToken';

describe('Problem delivery', () => {
  let user = null;
  let recipient = null;
  let deliveryMan = null;
  let deliveryStarted = null;
  let deliveryProblem = null;

  beforeEach(async () => {
    await trucate();
    user = await createUserToken();

    deliveryMan = await factory.create('DeliveryMan');
    recipient = await factory.create('Recipient');

    deliveryStarted = await factory.create('DeliveryStarted', {
      deliveryManId: deliveryMan.id,
      recipientId: recipient.id,
    });

    deliveryProblem = await factory.create('DeliveryProblem', { deliveryId: deliveryStarted.id });
  });

  it('should be able to get all problem delivery ', async () => {
    const res = await request(app)
      .get(`/deliveries/problems`)
      .set({
        Authorization: `Bearer ${user.token}`,
      })
      .send();

    expect(res.body).toHaveLength(1);
  });

  it('should be able to get problem delivery ', async () => {
    const res = await request(app)
      .get(`/deliveries/${deliveryStarted.id}/problems`)
      .send();

    expect(res.body).toHaveLength(1);
  });

  it('should be able to create a problem delivery ', async () => {
    const res = await request(app)
      .post(`/deliveries/${deliveryStarted.id}/problems`)
      .send({ description: 'descricao' });

    expect(res.status).toEqual(201);
  });

  it('should be able to cancel a delivery ', async () => {
    const res = await request(app)
      .put(`/problems/${deliveryProblem.id}/cancel-delivery`)
      .send();

    expect(res.status).toEqual(204);
  });
});
