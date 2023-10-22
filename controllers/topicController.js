const { Topic, Situation, Answer } = require('../models');

// CREATE
exports.createTopic = async (req, res) => {
    try {
        const topic = await Topic.create(req.body);
        res.redirect('/tables/topics');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// READ (all topics)
exports.getTopics = async () => {
    try {
        return await Topic.findAll({
            include: [{
                model: Situation,
                as: 'situations',
                include: [{
                    model: Answer,
                    as: 'answers'
                }]
            }],
            order: [
                ['id', 'ASC']
            ]
        });
    } catch (err) {
        throw new Error(err.message);
    }
};

exports.listTopics = async (req, res) => {
    try {
        const topics = await exports.getTopics();
        if (topics) {
            res.json(topics);
        } else {
            res.status(404).json({ message: 'Topics not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// READ (single topic)
exports.getTopic = async (req) => {
    try {
        return await Topic.findByPk(req.params.id, {
            include: [{
                model: Situation,
                as: 'situations',
                include: [{
                    model: Answer,
                    as: 'answers'
                }]
            }]
        });
    } catch (err) {
        throw new Error(err.message);
    }
};

exports.readTopic = async (req, res) => {
    try {
        const topic = await exports.getTopic(req);
        if (topic) {
            res.json(topic);
        } else {
            res.status(404).json({ message: 'Topic not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE
exports.updateTopic = async (req, res) => {
    try {
        const topic = await Topic.findByPk(req.params.id);
        if (topic) {
            await topic.update(req.body);
            res.json(topic);
        } else {
            res.status(404).json({ message: 'Topic not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE
exports.deleteTopic = async (req, res) => {
    try {
        const topic = await Topic.findByPk(req.params.id, {
            include: [{
                model: Situation,
                as: 'situations'
            }]
        });
        if (topic) {
            await topic.destroy();
            res.json({ message: 'Topic deleted' });
        } else {
            res.status(404).json({ message: 'Topic not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};