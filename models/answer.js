module.exports = (sequelize, DataTypes) => {
    const Answer = sequelize.define('Answer', {
        text: DataTypes.STRING
    }, {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        }
    });

    Answer.associate = function (models) {
        // associations can be defined here
        Answer.belongsToMany(models.Situation, {
            through: 'SituationToAnswers',
            foreignKey: 'answerId',
            as: 'situations'
        });
    };

    return Answer;
};
