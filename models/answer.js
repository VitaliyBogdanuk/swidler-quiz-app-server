module.exports = (sequelize, DataTypes) => {
    const Answer = sequelize.define('Answer', {
        text: DataTypes.STRING
    });

    return Answer;
};
