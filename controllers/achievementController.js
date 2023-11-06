const { Achievement } = require('../models');

// CREATE
exports.createAchievement = async (req, res) => {
    try {
        await Achievement.create(req.body);
        res.redirect('/tables/achievements');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// READ (all achievements)
// Separate function to retrieve achievements
exports.getAchievements = async () => {
    try {
        return await Achievement.findAll({
            order: [
                ['id', 'ASC']
            ]
        });
    } catch (err) {
        throw new Error(err.message);
    }
};

// Controller to send a JSON response
exports.listAchievements = async (req, res) => {
    try {
        const achievements = await exports.getAchievements();
        if (achievements) {
            res.json(achievements);
        } else {
            res.status(404).json({ message: 'Achievements not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// READ (single achievement)
exports.getAchievement = async () => {
    try {
        return await Achievement.findByPk(req.params.id);
    } catch (err) {
        throw new Error(err.message);
    }
};

exports.readAchievement = async (req, res) => {
    try {
        const achievement = await exports.getAchievement();
        if (achievement) {
            res.json(achievement);
        } else {
            res.status(404).json({ message: 'Achievement not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE
exports.updateAchievement = async (req, res) => {
    try {
        const achievement = await Achievement.findByPk(req.params.id);
        if (achievement) {
            await achievement.update(req.body);
            res.render('pages/achievements', {
                success_msg: 'Answer updated successfully',
                achievementsList: await exports.getAchievements(),
                error: []
            });
        } else {
            res.status(404).json({ message: 'Achievement not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE
exports.deleteAchievement = async (req, res) => {
    try {
        const achievement = await Achievement.findByPk(req.params.id);
        if (achievement) {
            //  req.flash('success_msg', `Achievement ${achievement.name} successfully removed!`);
            await achievement.destroy();
            res.json({ message: 'Achievement deleted' });
        } else {
            res.status(404).json({ message: 'Achievement not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
