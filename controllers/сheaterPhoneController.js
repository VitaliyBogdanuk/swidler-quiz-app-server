const { CheaterPhone, User } = require('../models');


// CREATE
exports.createCheaterPhone = async (req, res) => {
    try {
        await CheaterPhone.create(req.body);
        // req.flash('success_msg', 'Category successfully created!'); // TODO
        res.render('pages/cheaterPhones', {
            success_msg: 'Cheater phone created successfully',
            cheaterPhonesList: await exports.getCheaterPhones(),
            error: []
        });
    } catch (err) {
        // req.flash('error', 'Creation failed: ' + err.message); // TODO
        res.render('pages/form_cheaterPhone', {
            error: err
        });
    }
};

// READ (all categories)
exports.getCheaterPhones = async () => {
    try {
        return await CheaterPhone.findAll({
            include: [{
                model: User,
                as: 'user',
                attributes: ['id','name','email'] 
            }],
            order: [
                ['id', 'ASC']
            ]
        });
    } catch (err) {
        throw new Error(err.message);
    }
};

exports.listCheaterPhones = async (req, res) => {
    try {
        const cheaterPhones = await exports.getCheaterPhones();
        if (cheaterPhones) {
            res.json(cheaterPhones);
        } else {
            res.status(404).json({ message: 'Phones not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// READ (single category)
exports.getCheaterPhone = async (req) => {
    try {
        return await CheaterPhone.findOne({where: { phone: req.params.phone }}, {
            include: [{
                model: User,
                as: 'user',
                    attributes: ['id', 'name', 'email']
            }]
        });
    } catch (err) {
        throw new Error(err.message);
    }
};

exports.readCheaterPhone = async (req, res) => {
    try {
        const cheaterPhone = await exports.getCheaterPhone(req);
        if (cheaterPhone) {
            res.json(cheaterPhone);
        } else {
            res.status(404).json({ message: 'Phone not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE
exports.updateCheaterPhone = async (req, res) => {
    try {
        const cheaterPhone = await CheaterPhone.findByPk(req.params.id);
        if (cheaterPhone) {
            await cheaterPhone.update(req.body);
            res.json(cheaterPhone);
        } else {
            res.status(404).json({ message: 'Phone not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE
exports.deleteCheaterPhone = async (req, res) => {
    try {
        const cheaterPhone = await CheaterPhone.findByPk(req.params.id, {
            include: [{
                model: User,
                as: 'user'

            }]
        });
        if (cheaterPhone) {
            await cheaterPhone.destroy();
            // req.flash('success_msg', 'Category successfully deleted!'); // TODO
            res.json({ message: 'Phone deleted' });
        } else {
            req.flash('error', 'Phone deleted');
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (err) {
        // req.flash('error', 'Deleting failed: ' + err.message); // TODO
        res.status(500).json({ message: err.message });
    }
};