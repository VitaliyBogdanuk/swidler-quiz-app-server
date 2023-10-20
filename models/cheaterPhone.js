module.exports = (sequelize, DataTypes) => {
    const BadPhone = sequelize.define('CheaterPhone', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        phone: DataTypes.STRING,
        userId: DataTypes.INTEGER,
    }, {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        }
    });

    return BadPhone;
};