module.exports = (sequelize, DataTypes) => {
    const UserToTopic = sequelize.define('UserToTopic', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users', // name of the table, not necessarily the model
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        topicId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Topics', // name of the table, not necessarily the model
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

    return UserToTopic;
};
