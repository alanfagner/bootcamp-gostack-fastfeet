import BruteRedis from 'express-brute-redis';
import Brute from 'express-brute';

require('../bootstrap');

let bruteForce = { prevent: (req, res, next) => next() };

if (process.env.NODE_ENV === 'production') {
  const bruteStore = new BruteRedis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  });
  bruteForce = new Brute(bruteStore);
}

export default { ...bruteForce };
