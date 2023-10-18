module.exports = (sequelize, DataTypes) => {
    const Answer = sequelize.define('Answer', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
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
