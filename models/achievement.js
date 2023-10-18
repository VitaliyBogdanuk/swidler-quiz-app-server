module.exports = (sequelize, DataTypes) => {
    const Achievement = sequelize.define('Achievement', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: DataTypes.STRING,
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        scoreRequired: DataTypes.INTEGER,
    }, {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        }
    });

    return Achievement;
};
