import request from 'supertest';
import factory from '../factories';
import app from '../../src/app';

export default async () => {
  const { email, password } = await factory.create('User', {
    password: '123456',
  });
  const res = await request(app)
    .post('/sessions')
    .send({ email, password });

  return res.body;
};
