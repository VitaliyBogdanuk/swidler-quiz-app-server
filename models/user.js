const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'user'
        },
        passwordResetToken: DataTypes.STRING,
        passwordResetExpires: DataTypes.DATE,
        authProvider: {
            type: DataTypes.STRING,
            defaultValue: 'application'
        },
        googleId: {
            type: DataTypes.STRING,
            unique: true
        },
        score: DataTypes.INTEGER,
        correctAnswersCount: DataTypes.INTEGER,
        wrongAnswersCount: DataTypes.INTEGER
    }, {
        defaultScope: {
            attributes: { exclude: [ 'role', 'googleId', 'passwordResetExpires', 'passwordResetToken', 'createdAt', 'updatedAt'] },
        },
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            },
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            }
        }
    });

    User.prototype.isValidPassword = async function(password) {
        return await bcrypt.compare(password, this.password);
    };

    User.associate = function (models) {
        User.belongsToMany(models.Topic, {
            through: models.UserToTopic, // the junction table
            foreignKey: 'userId',
            otherKey: 'topicId',
            as: 'finishedTopics' // alias used in querying
        });
    };
    User.associate = function (models) {
        // associations can be defined here
        User.hasMany(models.CheaterPhone, {
            foreignKey: 'userId',
            as: 'user'
        });
    };


    return User;
};
