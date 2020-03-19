import request from 'supertest';
import path from 'path';
import mockdate from 'mockdate';

import trucate from '../util/trucate';
import app from '../../src/app';
import factory from '../factories';
import createUserToken from '../util/createUserToken';

describe('Delivery manager', () => {
  let user = null;
  let recipient = null;
  let deliveryMan = null;
  let delivery = null;
  let deliveryStarted = null;

  beforeEach(async () => {
    await trucate();
    user = await createUserToken();

    deliveryMan = await factory.create('DeliveryMan');
    recipient = await factory.create('Recipient');

    delivery = await factory.create('Delivery', { deliveryManId: deliveryMan.id, recipientId: recipient.id });
    deliveryStarted = await factory.create('DeliveryStarted', {
      deliveryManId: deliveryMan.id,
      recipientId: recipient.id,
    });
    await factory.create('DeliveryDelivered', { deliveryManId: deliveryMan.id, recipientId: recipient.id });
    await factory.create('DeliveryCanceled', { deliveryManId: deliveryMan.id, recipientId: recipient.id });
  });

  it('should be able to get all delivery ', async () => {
    const res = await request(app)
      .get(`/deliverymans/${deliveryMan.id}/deliveries`)
      .set({
        Authorization: `Bearer ${user.token}`,
      })
      .send();

    expect(res.body).toHaveLength(4);
  });

  it('should be able to get a delivery delivered ', async () => {
    mockdate.set(new Date(2011, 0, 1, 14, 30, 0, 0));
    const res = await request(app)
      .get(`/deliverymans/${deliveryMan.id}/deliveries?delivered=true`)
      .set({
        Authorization: `Bearer ${user.token}`,
      })
      .send();

    expect(res.body).toHaveLength(1);
  });

  it('should be able to get a delivery canceled ', async () => {
    const res = await request(app)
      .get(`/deliverymans/${deliveryMan.id}/deliveries?canceled=true`)
      .set({
        Authorization: `Bearer ${user.token}`,
      })
      .send();

    expect(res.body).toHaveLength(1);
  });

  it('should be able to get a delivery not canceled and not delivered', async () => {
    const res = await request(app)
      .get(`/deliverymans/${deliveryMan.id}/deliveries?canceled=false&delivered=false`)
      .set({
        Authorization: `Bearer ${user.token}`,
      })
      .send();

    expect(res.body).toHaveLength(2);
  });

  it('should be able to start delivery', async () => {
    const res = await request(app)
      .put(`/deliverymans/${deliveryMan.id}/deliveries/${delivery.id}/start`)
      .set({
        Authorization: `Bearer ${user.token}`,
      })
      .send();

    expect(res.status).toEqual(200);
  });

  it('should not be able to start delivery more 5 per day', async () => {
    const nowLocal = new Date(2011, 0, 1, 14, 30, 0, 0);
    mockdate.set(nowLocal);

    await factory.createMany('DeliveryStarted', 5, {
      deliveryManId: deliveryMan.id,
      recipientId: recipient.id,
      startDate: nowLocal,
    });

    const res = await request(app)
      .put(`/deliverymans/${deliveryMan.id}/deliveries/${delivery.id}/start`)
      .set({
        Authorization: `Bearer ${user.token}`,
      })
      .send();
    expect(res.status).toEqual(400);
  });

  it('should be able to finalize delivery', async () => {
    const res = await request(app)
      .put(`/deliverymans/${deliveryMan.id}/deliveries/${deliveryStarted.id}/end`)
      .set({
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'multipart/form-data',
      })
      .attach('signature', path.join(__dirname, '../image/avatar.jpg'));

    expect(res.status).toEqual(200);
  });
});
