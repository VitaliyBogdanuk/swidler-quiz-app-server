const { Feedback } = require('../models');


// CREATE
exports.createFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.create(req.body);
        // req.flash('success_msg', 'Category successfully created!'); // TODO
        if (feedback) {
            res.status(200).json(feedback);
        }
    } catch (err) {
        // req.flash('error', 'Creation failed: ' + err.message); // TODO
        res.redirect('back'); // assuming '/form/category' is where your creation form is located
    }
};

// READ (all categories)
exports.getFeedbacks = async () => {
    try {
        return await Feedback.findAll();
    } catch (err) {
        throw new Error(err.message);
    }
};

exports.listFeedbacks = async (req, res) => {
    try {
        const feedbacks = await exports.getFeedbacks();
        if (feedbacks) {
            res.status(200).json(feedbacks);
        } else {
            res.status(404).json({ message: 'Feedbacks not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE
exports.deleteFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findByPk(req.params.id);
        if (feedback) {
            await feedback.destroy();
            // req.flash('success_msg', 'Category successfully deleted!'); // TODO
            res.status(200).json({ message: 'Feedback deleted' });
        } else {
            req.flash('error', 'Feedback not found');
            res.status(404).json({ message: 'Feedback not found' });
        }
    } catch (err) {
        // req.flash('error', 'Deleting failed: ' + err.message); // TODO
        res.status(500).json({ message: err.message });
    }
};