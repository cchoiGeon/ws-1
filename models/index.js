const Sequelize = require('sequelize');
const Room = require('./room');
const Chat = require('./chat');
const User = require('./user');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.Room = Room;
db.Chat = Chat;
db.User = User;

Room.initiate(sequelize);
Chat.initiate(sequelize);
User.initiate(sequelize);

module.exports = db;