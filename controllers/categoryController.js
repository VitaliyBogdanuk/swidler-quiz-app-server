const { Category, Topic, Situation, Answer } = require('../models');


// CREATE
exports.createCategory = async (req, res) => {
    try {
        await Category.create(req.body);
        res.redirect('/tables/categories')
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// READ (all categories)
exports.getCategories = async () => {
    try {
        return await Category.findAll({
            include: [{
                model: Topic,
                as: 'topics',
                include: [{
                    model: Situation,
                    as: 'situations',
                    include: [{
                        model: Answer,
                        as: 'answers'
                    }]
                }]
            }]
        });
    } catch (err) {
        throw new Error(err.message);
    }
};

exports.listCategories = async (req, res) => {
    try {
        const categories = await exports.getCategories();
        if (categories) {
            res.json(categories);
        } else {
            res.status(404).json({ message: 'Categories not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// READ (single category)
exports.getCategory = async (req) => {
    try {
        return await Category.findByPk(req.params.id, {
            include: [{
                model: Topic,
                as: 'topics'
            }]
        });
    } catch (err) {
        throw new Error(err.message);
    }
};

exports.readCategory = async (req, res) => {
    try {
        const category = await exports.getCategory(req);
        if (category) {
            res.json(category);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE
exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (category) {
            await category.update(req.body);
            res.json(category);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id, {
            include: [{
                model: Topic,
                as: 'topics'
            }]
        });
        if (category) {
            await category.destroy();
            res.json({ message: 'Category deleted' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};