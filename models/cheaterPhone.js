module.exports = (sequelize, DataTypes) => {
    const CheaterPhone = sequelize.define('CheaterPhone', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        phone: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        published: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        }
    });
    CheaterPhone.associate = function (models) {
        CheaterPhone.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        });
        CheaterPhone.hasMany(models.PhoneDescription, {
            foreignKey: 'phoneId',
            as: 'descriptions',
            onDelete: 'cascade', 
            hooks:true
        });
    }
    
    return CheaterPhone;
};