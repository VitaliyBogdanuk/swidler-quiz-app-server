const { Situation, Topic, Answer } = require('../models');

// CREATE
exports.createSituation = async (req, res) => {
    let transaction;

    try {
        // Start a transaction
        transaction = await Situation.sequelize.transaction();

        // Extract values from the request body
        const { question, correctAnswer, answers, topicId, wrongAnswerDescription } = req.body;

        // Create a situation (without the correct answer ID for now)
        const situation = await Situation.create({
            question,
            // We will update the answerId later once we have created the answers
            topicId,
            wrongAnswerDescription
        }, { transaction });

        // Create answers and keep track of their IDs
        let createdAnswers = [];
        for (let text of answers) {
            const answer = await Answer.create({ text }, { transaction });
            createdAnswers.push(answer);
        }

        // Determine the correct answer based on the index from the request
        const correctAnswerIndex = parseInt(correctAnswer) - 1; // because arrays are zero-indexed
        if (correctAnswerIndex < 0 || correctAnswerIndex >= createdAnswers.length) {
            throw new Error('Correct answer index out of range');
        }
        const correctAnswerId = createdAnswers[correctAnswerIndex].id;

        // Update the situation with the correct answer ID
        await situation.update({ answerId: correctAnswerId }, { transaction });

        // Associate answers with the situation
        await situation.addAnswers(createdAnswers, { transaction });

        // If everything went well, commit the transaction
        await transaction.commit();

        res.render('pages/situations', {
            success_msg: 'Situation created successfully',
            situation: {
                ...situation.toJSON(), // basic data of the situation
                answers: createdAnswers // including created answers
            },
            situationsList: await exports.getSituations(),
            error: [],
        });
    } catch (err) {
        // If there's an error, rollback the transaction
        if (transaction) await transaction.rollback();
        res.status(500).json({ message: err.message });
    }
};

// READ (all situations)
exports.getSituations = async () => {
    try {
        return await Situation.findAll({
            include: [
                {
                    model: Topic,
                    as: 'topic'
                },
                {
                    model: Answer,
                    as: 'answers'
                }
            ],
            order: [
                ['id', 'ASC']
            ]
        });
    } catch (err) {
        throw new Error(err.message);
    }
};

exports.listSituations = async (req, res) => {
    try {
        const situations = await exports.getSituations();
        if (situations) {
            res.json(situations);
        } else {
            res.status(404).json({ message: 'Situations not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// READ (single situation)
exports.getSituation = async (req) => {
    try {
        return await Situation.findByPk(req.params.id, {
            include: [
                {
                    model: Topic,
                    as: 'topic'
                },
                {
                    model: Answer,
                    as: 'answers'
                }
            ]
        });
    } catch (err) {
        throw new Error(err.message);
    }
};

exports.readSituation = async (req, res) => {
    try {
        const situation = await exports.getSituation(req);
        if (situation) {
            res.json(situation);
        } else {
            res.status(404).json({ message: 'Situation not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE
exports.updateSituation = async (req, res) => {
    try {
        const situation = await Situation.findByPk(req.params.id);
        if (situation) {
            await situation.update(req.body);
            res.json(situation);
        } else {
            res.status(404).json({ message: 'Situation not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE
exports.deleteSituation = async (req, res) => {
    try {
        const situation = await Situation.findByPk(req.params.id);
        if (situation) {
            // Fetch all answers related to this situation
            const answers = await situation.getAnswers();
            if (answers.length > 0) {
                // Delete each answer related to the situation
                for (let answer of answers) {
                    await answer.destroy();
                }
            }

            // Now, delete the situation
            await situation.destroy();
            res.json({ message: 'Situation and its answers deleted' });
        } else {
            res.status(404).json({ message: 'Situation not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports._getSituations = async () => {
    try {
        return await Situation.findAll({
            
            order: [
                ['id', 'ASC']
            ]
        });
    } catch (err) {
        throw new Error(err.message);
    }
};

exports._listSituations = async (req, res) => {
    try {
        const situations = await exports._getSituations();
        if (situations) {
            res.json(situations);
        } else {
            res.status(404).json({ message: 'Situations not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};