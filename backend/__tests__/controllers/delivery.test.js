import request from 'supertest';

import trucate from '../util/trucate';
import app from '../../src/app';
import factory from '../factories';
import createUserToken from '../util/createUserToken';

describe('Deliveries', () => {
  let user = null;
  let recipient = null;
  let deliveryMan = null;

  beforeEach(async () => {
    await trucate();
    user = await createUserToken();

    deliveryMan = await factory.create('DeliveryMan');
    recipient = await factory.create('Recipient');
  });

  it('should be able to create a delivery', async () => {
    const delivery = await factory.attrs('Delivery');

    const res = await request(app)
      .post('/deliveries')
      .set({
        Authorization: `Bearer ${user.token}`,
      })
      .send({ ...delivery, recipientId: recipient.id, deliveryManId: deliveryMan.id });

    expect(res.body).toHaveProperty('id');
  });

  it('should not be able to create delivery without deliveryMan', async () => {
    const delivery = await factory.attrs('Delivery');

    const res = await request(app)
      .post('/deliveries')
      .set({
        Authorization: `Bearer ${user.token}`,
      })
      .send(delivery);

    expect(res.status).toEqual(400);
  });

  it('should be able to get deliveries', async () => {
    const res = await request(app)
      .get('/deliveries')
      .set({
        Authorization: `Bearer ${user.token}`,
      })
      .send();

    expect(res.status).toEqual(200);
  });

  it('should be able to get deliveries by name', async () => {
    const delivery = await factory.create('Delivery');

    const res = await request(app)
      .get(`/deliveries?name=${delivery.name}`)
      .set({
        Authorization: `Bearer ${user.token}`,
      })
      .send();

    expect(res.body).toHaveLength(1);
    expect(res.status).toEqual(200);
  });

  it('should be able to update a delivery', async () => {
    const delivery = await factory.create('Delivery');

    const res = await request(app)
      .put(`/deliveries/${delivery.id}`)
      .set({
        Authorization: `Bearer ${user.token}`,
      })
      .send({ ...delivery.dataValues, recipientId: recipient.id, deliveryManId: deliveryMan.id });

    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should not be able to upadte a delivery', async () => {
    const delivery = await factory.create('Delivery');

    const res = await request(app)
      .put(`/deliveries/0`)
      .set({
        Authorization: `Bearer ${user.token}`,
      })
      .send({ ...delivery.dataValues, recipientId: recipient.id, deliveryManId: deliveryMan.id });

    expect(res.status).toEqual(404);
  });

  it('should be able to delete a delivery', async () => {
    const delivery = await factory.create('Delivery');

    const res = await request(app)
      .delete(`/deliveries/${delivery.id}`)
      .set({
        Authorization: `Bearer ${user.token}`,
      })
      .send();

    expect(res.status).toEqual(204);
  });
});
