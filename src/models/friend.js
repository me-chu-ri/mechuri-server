const Sequelize = require('sequelize');

module.exports = class Friend extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            accepted_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Friend',
            tableName: 'friend',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Friend.belongsTo(db.User, {foreignKey: 'requestor_id', targetKey: 'id'});
        db.Friend.belongsTo(db.User, {foreignKey: 'receiver_id', targetKey: 'id'});
    }
};