const Sequelize = require('sequelize');

module.exports = class Menu extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            name: {
                type: Sequelize.CHAR(45),
                allowNull: false,
            },
            code: {
                type: Sequelize.CHAR(8),
                allowNull: false,
            },
            major: {
                type: Sequelize.CHAR(30),
                allowNull: false,
            },
            middle: {
                type: Sequelize.CHAR(30),
                allowNull: false,
            },
            meal_type: {
                type: Sequelize.ENUM('BREAKFAST','LUNCH','DINNER','NIGHT','DESSERT'),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Menu',
            tableName: 'menu',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Menu.belongsTo(db.Nutrient, {foreignKey: 'nutrient_id', targetKey: 'id'});
    }
};