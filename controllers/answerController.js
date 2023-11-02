const { Answer, SituationToAnswer } = require('../models');

// CREATE
exports.createAnswer = async (req, res) => {
    transaction = await Answer.sequelize.transaction();
    try {
        const answer = await Answer.create(req.body);
        await SituationToAnswer.create({ situationId: req.body.stuationId, answerId: answer.id })
        await transaction.commit();
        res.render('pages/answers', {
            success_msg: 'Answer created successfully',
            answersList: await exports.getAnswers(),
            error: []
        });
    } catch (err) {
        await transaction.rollback();
        res.render('pages/form_answers', {
            error: err
        });
    }
};

// READ (all answers)
exports.getAnswers = async () => {
    try {
        return await Answer.findAll({
            order: [
                ['id', 'ASC']
            ]
        });
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

exports._getAnswers = async () => {
    try {
        return await Answer.findAll({
            order: [
                ['id', 'ASC']
            ]
        });
    } catch (err) {
        throw new Error(err.message);
    }
};

exports._listAnswers = async (req, res) => {
    try {
        const answers = await exports._getAnswers();
        if (answers) {
            res.json(answers);
        } else {
            res.status(404).json({ message: 'Answers not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports._getSituationToAnswer = async (req,res) => {
    try {
        const result =  await SituationToAnswer.findAll({
            order: [
                ['id', 'ASC']
            ]
        });
        return res.json(result)
    } catch (err) {
        throw new Error(err.message);
    }
};