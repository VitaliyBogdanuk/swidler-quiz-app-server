module.exports = (sequelize, DataTypes) => {
    const SituationToAnswer = sequelize.define('SituationToAnswer', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        situationId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Situations', // name of the table, not necessarily the model
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        answerId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Answers', // name of the table, not necessarily the model
                key: 'id'
            },
            onDelete: 'CASCADE'
        }
    }, {
        timestamps: true
    }, {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        }
    });

    return SituationToAnswer;
};
