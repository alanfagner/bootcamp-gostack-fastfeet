import request from 'supertest';
import path from 'path';

import trucate from '../util/trucate';
import app from '../../src/app';
import factory from '../factories';
import createUserToken from '../util/createUserToken';

describe('Delivery Mans', () => {
  let user = '';

  beforeEach(async () => {
    await trucate();
    user = await createUserToken();
  });

  it('should be able to create a deliveryMan', async () => {
    const deliveryMan = await factory.attrs('DeliveryMan');

    const res = await request(app)
      .post('/deliverymans')
      .set({
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'multipart/form-data',
      })
      .field({ email: deliveryMan.name, name: deliveryMan.email })
      .attach('file', path.join(__dirname, '../image/avatar.jpg'));

    expect(res.body).toHaveProperty('id');
  });

  it('should be able to get DeliveryMans', async () => {
    const res = await request(app)
      .get('/deliverymans')
      .set({
        Authorization: `Bearer ${user.token}`,
      })
      .send();

    expect(res.status).toBe(200);
  });

  it('should be able to get DeliveryMans by name', async () => {
    const deliveryMan = await factory.create('DeliveryMan');

    const res = await request(app)
      .get(`/deliverymans?name=${deliveryMan.name}`)
      .set({
        Authorization: `Bearer ${user.token}`,
      })
      .send();

    expect(res.body).toHaveLength(1);
    expect(res.status).toBe(200);
  });

  it('should be able to update DeliveryMan', async () => {
    const deliveryMan = await factory.create('DeliveryMan');

    const res = await request(app)
      .put(`/deliverymans/${deliveryMan.id}`)
      .set({
        Authorization: `Bearer ${user.token}`,
      })
      .send(deliveryMan.dataValues);

    expect(res.status).toBe(200);
  });

  it('should not be able to update DeliveryMan', async () => {
    const res = await request(app)
      .put(`/deliverymans/0`)
      .set({
        Authorization: `Bearer ${user.token}`,
      })
      .send({ name: 'teste', email: 'teste@teste.com.br' });

    expect(res.status).toBe(404);
  });

  it('should be able to delete DeliveryMan', async () => {
    const deliveryMan = await factory.create('DeliveryMan');

    const res = await request(app)
      .delete(`/deliverymans/${deliveryMan.id}`)
      .set({
        Authorization: `Bearer ${user.token}`,
      })
      .send();

    expect(res.status).toBe(204);
  });
});
