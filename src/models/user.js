const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            user_uuid: {
                type: Sequelize.UUID(16),
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
            },
            // phone: {
            //     type: Sequelize.STRING(15),
            //     allowNull: false,
            //     unique: true,
            // },
            email: {
                type: Sequelize.CHAR(100),
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING(150),
                allowNull: false,
            },
            nickname: {
                type: Sequelize.STRING(15),
                allowNull: false,
                unique: true,
            },
            joined_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'User',
            tableName: 'user',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.User.hasMany(db.Group, {foreignKey: 'owner_id', sourceKey: 'id'});
        db.User.hasMany(db.GroupUser, {foreignKey: 'user_id', sourceKey: 'id'});
        db.User.hasMany(db.Friend, {foreignKey: 'requestor_id', sourceKey: 'id'});
        db.User.hasMany(db.Friend, {foreignKey: 'receiver_id', sourceKey: 'id'});
        db.User.hasMany(db.FriendRequest, {foreignKey: 'requestor_id', sourceKey: 'id'});
        db.User.hasMany(db.FriendRequest, {foreignKey: 'receiver_id', sourceKey: 'id'});
        db.User.hasMany(db.GroupRequest, {foreignKey: 'requestor_id', sourceKey: 'id'});
        db.User.hasMany(db.GroupRequest, {foreignKey: 'receiver_id', sourceKey: 'id'});
    }
};