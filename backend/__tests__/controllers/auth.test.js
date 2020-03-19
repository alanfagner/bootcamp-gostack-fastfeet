import request from 'supertest';

import bcrypt from 'bcryptjs';
import trucate from '../util/trucate';
import app from '../../src/app';

import factory from '../factories';

describe('User', () => {
  let user = null;
  const passwordDefault = '123456';

  beforeEach(async () => {
    await trucate();
    user = await factory.create('User', {
      password: passwordDefault,
    });
  });

  it('should encrypt user password when new user created', async () => {
    const compareHash = await bcrypt.compare(user.password, user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('should be able to get session id', async () => {
    const res = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    expect(res.body).toHaveProperty('token');
  });

  it('should not be able to get session id', async () => {
    const res = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: 'teste' });

    expect(res.status).toBe(401);
  });

  it('should be get validation exception', async () => {
    const res = await request(app)
      .post('/sessions')
      .send({ email: 'teste@teste.com' });

    expect(res.status).toBe(400);
  });
});
