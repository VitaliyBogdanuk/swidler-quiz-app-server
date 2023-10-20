module.exports = (sequelize, DataTypes) => {
    const BadNumber = sequelize.define('BadNumber', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        number: DataTypes.STRING,
        description: DataTypes.STRING,
    }, {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        }
    });

    BadNumber.associate = function (models) {
        // associations can be defined here
        BadNumber.belongsToMany(models.Situation, {
            through: 'UserToNumbers',
            foreignKey: 'userId',
            as: 'users'
        });
    };

    return BadNumber;
};