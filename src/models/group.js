const Sequelize = require('sequelize');

module.exports = class Group extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            group_uuid: {
                type: Sequelize.UUID(16),
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
            },
            name: {
                type: Sequelize.CHAR(30),
                allowNull: false,
                unique: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Group',
            tableName: 'group',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Group.belongsTo(db.User, {foreignKey: 'owner_id', targetKey: 'id'});
        db.Group.hasMany(db.GroupUser, {foreignKey: 'group_id', sourceKey: 'id'});
    }
};