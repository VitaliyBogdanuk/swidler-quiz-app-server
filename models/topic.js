module.exports = (sequelize, DataTypes) => {
    const Topic = sequelize.define('Topic', {
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        categoryId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Categories', // name of the table, not the model
                key: 'id'
            }
        }
    });

    Topic.associate = function(models) {
        // associations can be defined here
        Topic.belongsTo(models.Category, {
            foreignKey: 'categoryId',
            as: 'category'
        });
    };

    Topic.associate = function (models) {
        // associations can be defined here
        Topic.hasMany(models.Situation, {
            foreignKey: 'topicId',
            as: 'situations'
        });
    };

    return Topic;
};