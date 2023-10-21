module.exports = (sequelize, DataTypes) => {
    const Feedback = sequelize.define('Feedback', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        feedback: DataTypes.STRING,
    }, {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        }
    });
    return Feedback;
};
