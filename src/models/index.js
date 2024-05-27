const Sequelize = require('sequelize');
const User = require('./user');
const Group = require('./group');
const GroupUser = require('./group_user');
const Friend = require('./friend');
const FriendRequest = require('./friend_request');
const GroupRequest = require('./group_request');
const Menu = require('../models/menu');
const Nutrient = require('../models/nutrient');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password,config);

db.sequelize = sequelize;
db.User = User;
db.Group = Group;
db.GroupUser = GroupUser;
db.Friend = Friend;
db.FriendRequest = FriendRequest;
db.GroupRequest = GroupRequest;
db.Menu = Menu;
db.Nutrient = Nutrient;

User.init(sequelize);
Group.init(sequelize);
GroupUser.init(sequelize);
Friend.init(sequelize);
FriendRequest.init(sequelize);
GroupRequest.init(sequelize);
Menu.init(sequelize);
Nutrient.init(sequelize);

User.associate(db); //얘는 다른 테이블과의 관계를 연결하는 것
Group.associate(db);
GroupUser.associate(db);
Friend.associate(db);
FriendRequest.associate(db);
GroupRequest.associate(db);
Menu.associate(db);
Nutrient.associate(db);

module.exports = db;
