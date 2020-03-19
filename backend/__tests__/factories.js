import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';
import Recipient from '../src/app/models/Recipient';
import DeliveryMan from '../src/app/models/DeliveryMan';
import Delivery from '../src/app/models/Delivery';
import DeliveryProblem from '../src/app/models/DeliveryProblem';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: '',
});

factory.define('Recipient', Recipient, {
  name: faker.name.findName(),
  number: faker.random.number(),
  address: faker.address.streetName(),
  complement: faker.address.secondaryAddress(),
  state: faker.address.state(),
  city: faker.address.city(),
  zipCode: faker.random.number(),
});

factory.define('DeliveryMan', DeliveryMan, {
  name: faker.name.findName(),
  email: faker.internet.email(),
});

factory.define('Delivery', Delivery, {
  product: faker.name.findName(),
});

factory.define('DeliveryStarted', Delivery, {
  product: faker.name.findName(),
  startDate: new Date(),
});

factory.define('DeliveryDelivered', Delivery, {
  product: faker.name.findName(),
  startDate: new Date(),
  endDate: new Date(),
});

factory.define('DeliveryCanceled', Delivery, {
  product: faker.name.findName(),
  startDate: new Date(),
  canceledAt: new Date(),
});

factory.define('DeliveryProblem', DeliveryProblem, {
  description: faker.random.alphaNumeric(20),
});

export default factory;
