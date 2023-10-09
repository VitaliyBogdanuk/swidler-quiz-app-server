module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        title: DataTypes.STRING
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
