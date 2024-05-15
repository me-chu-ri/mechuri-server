const Sequelize = require('sequelize');

module.exports = class GroupRequest extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            group_uuid: {
                type: Sequelize.UUID(16),
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
            },
            requested_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'GroupRequest',
            tableName: 'group_request',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.GroupRequest.belongsTo(db.User, {foreignKey: 'requestor_id', targetKey: 'id'});
        db.GroupRequest.belongsTo(db.User, {foreignKey: 'receiver_id', targetKey: 'id'});
    }
};