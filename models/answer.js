module.exports = (sequelize, DataTypes) => {
    const Answer = sequelize.define('Answer', {
        text: DataTypes.STRING
    });

    Answer.associate = function(models) {
        // associations can be defined here
        Answer.belongsToMany(models.Situation, {
            through: 'SituationToAnswers',
            foreignKey: 'answerId',
            as: 'situations'
        });
    };

    return Answer;
};
