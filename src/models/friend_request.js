const Sequelize = require('sequelize');

module.exports = class FriendRequest extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            requested_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'FriendRequest',
            tableName: 'friend_request',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.FriendRequest.belongsTo(db.User, {foreignKey: 'requestor_id', targetKey: 'id'});
        db.FriendRequest.belongsTo(db.User, {foreignKey: 'receiver_id', targetKey: 'id'});
    }
};