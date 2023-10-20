module.exports = (sequelize, DataTypes) => {
    const UserToNumber = sequelize.define('UserToNumber', {
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
        numberId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'BadNumbers', // name of the table, not necessarily the model
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

    return UserToNumber;
};
