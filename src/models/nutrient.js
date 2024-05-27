const Sequelize = require('sequelize');

module.exports = class Nutrient extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            energy: {
                type: Sequelize.CHAR(10),
                allowNull: false,
            },
            carbohydrate: {
                type: Sequelize.CHAR(10),
                allowNull: false,
            },
            protein: {
                type: Sequelize.CHAR(10),
                allowNull: false,
            },
            fat: {
                type: Sequelize.CHAR(10),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Nutrient',
            tableName: 'nutrient',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Nutrient.hasMany(db.Menu, {foreignKey: 'nutrient_id', sourceKey: 'id'});
    }
};