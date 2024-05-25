import Sequelize from 'sequelize';

const sequelize = new Sequelize('product-listing', 'root', 'root', {
  host: 'localhost',
  port: 3308,
  dialect: 'mysql'
});

export default sequelize;