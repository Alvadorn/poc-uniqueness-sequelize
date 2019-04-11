const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://poc:poc@db:5432/poc');

const Telephone = require('./model/telephone')(sequelize, Sequelize);

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

const runAll = async () => {
  // Sync DB
  sequelize
    .sync()
    .then(() => console.log('DB synced'))
    .catch(() => console.log('Failure on sync'));

  await sleep(2000);

  // Add first telephone
  sequelize
    .sync()
    .then(() => {
      Telephone.create({ ddd: '11', number: '11111111' });
    })
    .catch(() => console.log('Error on first add'));

  await sleep(2000);

  // Add second telephone with different DDD successfully
  sequelize
    .sync()
    .then(() => {
      Telephone.create({ ddd: '10', number: '11111111' });
    })
    .catch(() => console.log('Error on second add'));

  await sleep(2000);

  // Add third telephone with same DDD and number different successfully
  sequelize
    .sync()
    .then(() => {
      Telephone.create({ ddd: '11', number: '11111110' });
    })
    .catch(() => console.log('Error on third add'));

  await sleep(2000);

  // Add third telephone with same DDD and number of first add and it'll fail
  sequelize
    .sync()
    .then(() => {
      Telephone.create({ ddd: '11', number: '11111111' });
    })
    .catch(() => console.log('Error on fourth add'));
};

runAll().then(() => {
  console.log('Completing');
});
