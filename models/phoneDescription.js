module.exports = (sequelize, DataTypes) => {
    const PhoneDescription = sequelize.define('PhoneDescription', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        description: DataTypes.STRING,
        phoneId: DataTypes.INTEGER,
    }, {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        }
    });
    PhoneDescription.associate = function (models) {
        PhoneDescription.belongsTo(models.CheaterPhone, {
            foreignKey: 'phoneId',
            as: 'descriptions'
        })

    }
    return PhoneDescription;
};