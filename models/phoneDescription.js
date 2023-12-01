module.exports = (sequelize, DataTypes) => {
    const PhoneDescription = sequelize.define('PhoneDescription', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        description: DataTypes.STRING,
        phoneId: DataTypes.INTEGER,
        approved: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        }
    });
    PhoneDescription.associate = function (models) {
        PhoneDescription.belongsTo(models.CheaterPhone, {
            foreignKey: 'phoneId',
            as: 'cheaterPhone'
        })
        PhoneDescription.hasMany(models.Proof, {
            foreignKey: 'descriptionId',
            as: 'proofs',
            onDelete: 'cascade',
            hooks: true
        });


    }
    return PhoneDescription;
};