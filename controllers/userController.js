const { User, UserToTopic, Topic } = require('../models');

// List all users
exports.getUsers = async () => {
    try {
        return await User.findAll({
            order: [
                ['id', 'ASC']
            ]
        });
    } catch (err) {
        throw new Error(err.message);
    }
};

// Controller to send a JSON response
exports.listUsers = async (req, res) => {
    try {
        const users = await exports.getUsers();
        if (users) {
            res.json(users);
        } else {
            res.status(404).json({ message: 'Userss not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a user
exports.createUser = async (req, res) => {
    try {
        if (req.body.repeatedPassword !== req.body.password) //TODO pass validation on view
            throw ("Wrong password")
        await User.create(req.body);
        res.render('pages/users', {
            success_msg: 'User created successfully',
            usersList: await exports.getUsers(),
            error: []
        });
    } catch (err) {
        res.render('pages/form_users', {
            error: err
        });
    }
};

// Read a user
exports.getUser = async (req) => {
    try {
        return await User.findByPk(req.params.id,{
            attributes: ['id', 'name', 'email','score' /* other user fields you need */],
            include: [{
                model: Topic,
                as: 'finishedTopics',
                attributes: ['id'],  // This line ensures that only the 'id' field of the Topic model is returned.
                through: {
                    attributes: [], // This line ensures that no attributes of the join table (UserToTopic) are returned.
                }
            }],
            where: { id: req.body.id }

        });
    } catch (err) {
        throw new Error(err.message);
    }
};

exports.readUser = async (req, res) => {
    try {
        const user = await exports.getUser(req);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a user
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        await user.update(req.body);
        res.render('pages/users', {
            success_msg: 'User updated successfully',
            usersList: await exports.getUsers(),
            error: []
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        req.flash('success_msg', `User ${user.name} successfully removed!`);
        await user.destroy();
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateUserTopics = async (req, res) => {
    try {
        await UserToTopic.create(req.body);
        res.status(200).json({ message: 'Updated successfully'});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
// Update a user score
exports.updateUserScore = async (req, res) => {
    try {
        const user = await User.findByPk(req.body.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        await user.update({ id: req.body.id, score: user.score + req.body.score });
        res.status(200).json({ message: 'Updated successfully', user: user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Update a user correct answer
exports.updateUserCorrectAnswer = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        await user.update({ id: req.params.id, correctAnswersCount: ++user.correctAnswersCount });
        res.status(200).json({ message: 'Updated successfully', user: user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Update a user wrong answer
exports.updateUserWrongAnswer = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        await user.update({ id: req.params.id, wrongAnswersCount: ++user.wrongAnswersCount });
        res.status(200).json({ message: 'Updated successfully', user: user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};