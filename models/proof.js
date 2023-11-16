module.exports = (sequelize, DataTypes) => {
    const Proof = sequelize.define('Proof', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        proof: DataTypes.STRING,
        descriptionId: DataTypes.INTEGER,
    }, {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        }
    });
    Proof.associate = function (models) {
        Proof.belongsTo(models.PhoneDescription, {
            foreignKey: 'descriptionId',
            as: 'description'
        })
    }
    return Proof;
};