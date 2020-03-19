const NODE_ENV = process.env.NODE_ENV !== undefined ? `.${process.env.NODE_ENV}` : '';

require('dotenv').config({
  path: `.env${NODE_ENV}`,
});
