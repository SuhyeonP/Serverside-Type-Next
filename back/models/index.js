const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User=require('./user')(sequelize,Sequelize);
db.Shop=require('./shop')(sequelize,Sequelize);
db.Menu=require('./menu')(sequelize,Sequelize);
db.MenuPart=require('./menuPart')(sequelize,Sequelize);
db.Order=require('./order')(sequelize,Sequelize);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
