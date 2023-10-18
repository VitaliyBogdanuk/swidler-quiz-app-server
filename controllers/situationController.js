const { Situation, Topic, Answer } = require('../models');

// CREATE
exports.createSituation = async (req, res) => {
    const t = await Situation.sequelize.transaction();

    try {
        await Answer.create({ text: req.body.answer1 })
            .then(() => {
                Answer.create({ text: req.body.answer2 })
                    .then(() => {
                        Answer.create({ text: req.body.answer3 })
                            .then(result => {
                                switch (req.body.inlineRadioOptions) {
                                    case ("0"): req.body.answerId = result.id - 2;
                                        break;
                                    case ("1"): req.body.answerId = result.id - 1;
                                        break;
                                    case ("2"): req.body.answerId = result.id;
                                }
                            })
                            .then(() => {
                                Situation.create(req.body);
                            })
                    })
            })
        res.redirect('/tables/situations');
        await t.commit();
    } catch (err) {
        await t.rollback();
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
            await situation.destroy();
            res.json({ message: 'Situation deleted' });
        } else {
            res.status(404).json({ message: 'Situation not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};