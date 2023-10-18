module.exports = (sequelize, DataTypes) => {
    const Achievement = sequelize.define('Achievement', {
        title: DataTypes.STRING,
        image: DataTypes.STRING,
        scoreRequired: DataTypes.INTEGER,
    }, {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        }
    });

    return Achievement;
};
