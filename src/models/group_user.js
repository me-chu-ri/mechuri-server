const Sequelize = require('sequelize');

module.exports = class GroupUser extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'GroupUser',
            tableName: 'group_user',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.GroupUser.belongsTo(db.Group, {foreignKey: 'group_id', targetKey: 'id'});
        db.GroupUser.belongsTo(db.User, {foreignKey: 'user_id', targetKey: 'id'});
    }
};