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
            allowNull: false
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
        authId: DataTypes.STRING,
        score: DataTypes.INTEGER
    }, {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
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

    return User;
};
