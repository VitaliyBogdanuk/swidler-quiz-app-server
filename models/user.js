module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        authProvider: DataTypes.STRING,
        authId: DataTypes.STRING,
        score: DataTypes.INTEGER
    }, {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        }
    });

    return User;
};
