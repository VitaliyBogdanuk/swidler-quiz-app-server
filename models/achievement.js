module.exports = (sequelize, DataTypes) => {
    const Achievement = sequelize.define('Achievement', {
        name: DataTypes.STRING,
        scoreRequired: DataTypes.INTEGER
    }, {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        }
    });

    return Achievement;
};
