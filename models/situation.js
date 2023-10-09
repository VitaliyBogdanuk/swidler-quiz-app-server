module.exports = (sequelize, DataTypes) => {
    const Situation = sequelize.define('Situation', {
        text: DataTypes.STRING,
        correctAnswerId: DataTypes.INTEGER,
        wrongAnswerDescription: DataTypes.STRING
    });

    return Situation;
};
