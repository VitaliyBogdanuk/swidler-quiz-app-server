module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: DataTypes.STRING,
        authProvider: DataTypes.STRING,
        authId: DataTypes.STRING,
        score: DataTypes.INTEGER
    });

    return User;
};
