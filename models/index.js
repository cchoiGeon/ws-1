const Sequelize = require('sequelize');
const Room = require('./room');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.Room = Room;

Room.initiate(sequelize);

module.exports = db;