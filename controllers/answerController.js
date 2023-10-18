const { Answer } = require('../models');

// CREATE
exports.createAnswer = async (req, res) => {

    try {
    await Answer.create(req.body);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// READ (all answers)
exports.getAnswers = async () => {
    try {
        return await Answer.findAll();
    } catch (err) {
        throw new Error(err.message);
    }
};

exports.listAnswers = async (req, res) => {
    try {
        const answers = await exports.getAnswers();
        if (answers) {
            res.json(answers);
        } else {
            res.status(404).json({ message: 'Answers not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// READ (single answer)
exports.getAnswer = async (req) => {
    try {
        return await Answer.findByPk(req.params.id);
    } catch (err) {
        throw new Error(err.message);
    }
};

exports.readAnswer = async (req, res) => {
    try {
        const answer = await exports.getAnswer(req);
        if (answer) {
            res.json(answer);
        } else {
            res.status(404).json({ message: 'Answer not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE
exports.updateAnswer = async (req, res) => {
    try {
        const answer = await Answer.findByPk(req.params.id);
        if (answer) {
            await answer.update(req.body);
            res.json(answer);
        } else {
            res.status(404).json({ message: 'Answer not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE
exports.deleteAnswer = async (req, res) => {
    try {
        const answer = await Answer.findByPk(req.params.id);
        if (answer) {
            await answer.destroy();
            res.json({ message: 'Answer deleted' });
        } else {
            res.status(404).json({ message: 'Answer not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};