module.exports = (sequelize, DataTypes) => {
    const Situation = sequelize.define('Situation', {
        question: DataTypes.STRING,
        answerId: DataTypes.INTEGER,
        topicId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Topics', // name of the table, not the model
                key: 'id'
            }
        },
        wrongAnswerDescription: DataTypes.STRING,
    }, {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        }
    });

    Situation.associate = function (models) {
        // associations can be defined here
        Situation.belongsTo(models.Topic, {
            foreignKey: 'topicId',
            as: 'topic'
        });
        Situation.belongsToMany(models.Answer, {
            through: 'SituationToAnswers',
            foreignKey: 'situationId',
            as: 'answers'
        });
    };

    return Situation;
};
