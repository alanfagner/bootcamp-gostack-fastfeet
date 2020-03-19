const bcrypt = require('bcryptjs');
// yarn sequelize seed:generate --name admin-user
// yarn sequelize db:seed:all
module.exports = {
  up: async QueryInterface => {
    try {
      const resp = await QueryInterface.bulkInsert(
        'users',
        [
          {
            name: 'Distruidora FastFeet',
            email: 'admin@fastfeet.com',
            password_hash: bcrypt.hashSync('123456', 8),
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        {}
      );
    } catch (error) {
      if (error.fields.email === 'admin@fastfeet.com') return;
      throw error;
    }
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
