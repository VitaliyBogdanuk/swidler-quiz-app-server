module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: DataTypes.STRING,
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        }
    });

    Category.associate = function (models) {
        // associations can be defined here
        Category.hasMany(models.Topic, {
            foreignKey: 'categoryId',
            as: 'topics'
        });
    };

    return Category;
};
