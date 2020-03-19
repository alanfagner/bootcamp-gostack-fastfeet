import request from 'supertest';

import app from '../../src/app';
import factory from '../factories';
import truncate from '../util/trucate';
import createUserToken from '../util/createUserToken';

describe('Recipient', () => {
  let user = '';

  beforeEach(async () => {
    await truncate();

    user = await createUserToken();
  });

  it('should be able to create a recipient', async () => {
    const recipient = await factory.attrs('Recipient');

    const res = await request(app)
      .post('/recipients')
      .set({
        Authorization: `Bearer ${user.token}`,
      })
      .send({ ...recipient });

    expect(res.body).toHaveProperty('id');
  });

  it('should not be able to create a recipient', async () => {
    const res = await request(app)
      .post('/recipients')
      .set({
        Authorization: `Bearer ${user.token}`,
      })
      .send();

    expect(res.status).toBe(400);
  });

  it('should be able to update a recipient', async () => {
    const recipient = await factory.create('Recipient');

    const res = await request(app)
      .put(`/recipients/${recipient.id}`)
      .set({
        Authorization: `Bearer ${user.token}`,
      })
      .send({ ...recipient.dataValues, name: 'Alan Fagner' });

    expect(res.body).toHaveProperty('id');
  });

  it('should be able to get recipients', async () => {
    const res = await request(app)
      .get('/recipients')
      .set({
        Authorization: `Bearer ${user.token}`,
      })
      .send();
    expect(res.status).toBe(200);
  });

  it('should be able to get recipient Alan', async () => {
    const recipient = await factory.create('Recipient');

    const res = await request(app)
      .get(`/recipients?name=${recipient.name}`)
      .set({
        Authorization: `Bearer ${user.token}`,
      })
      .send();

    expect(res.body).toHaveLength(1);
    expect(res.status).toBe(200);
  });

  it('should be able to delete a recipient', async () => {
    const recipient = await factory.create('Recipient');

    const res = await request(app)
      .delete(`/recipients/${recipient.id}`)
      .set({
        Authorization: `Bearer ${user.token}`,
      })
      .send();

    expect(res.status).toBe(204);
  });

  it('should be able to not acess rotes create', async () => {
    const recipient = await factory.attrs('Recipient');

    const res = await request(app)
      .post(`/recipients`)
      .send(recipient);

    expect(res.status).toBe(401);
  });

  it('should be able to not acess rotes update', async () => {
    const recipient = await factory.create('Recipient');

    const res = await request(app)
      .put(`/recipients/${recipient.id}`)
      .send(recipient.dataValues);

    expect(res.status).toBe(401);
  });

  it('should be able to not acess rotes delete', async () => {
    const recipient = await factory.create('Recipient');

    const res = await request(app)
      .delete(`/recipients/${recipient.id}`)
      .send();

    expect(res.status).toBe(401);
  });
});
