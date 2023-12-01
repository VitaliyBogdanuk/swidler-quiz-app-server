const { CheaterPhone, User, PhoneDescription, Proof } = require('../models');

// CREATE
exports.createCheaterPhoneAdmin = async (req, res) => {
    transaction = await CheaterPhone.sequelize.transaction();
    try {
        req.params.phone = req.body.phone;
        let cheaterPhone = await exports.getCheaterPhoneForCreating(req, { transaction });
        if (!cheaterPhone) {
            cheaterPhone = await CheaterPhone.create(req.body, { transaction });
        }
        await PhoneDescription
            .create({ description: req.body.description, phoneId: cheaterPhone.id}, { transaction })
            .then(async (result) => {
                if (req.files) {
                    let data = [];
                    req.files.uploadedFile.forEach((file) => {
                        data.push({ proof: file.filename, descriptionId: result.id })
                    })
                    await Proof.bulkCreate(data, { transaction });
                }
            })
        await transaction.commit();
        res.render('pages/cheaterPhones', {
            success_msg: 'Phone created successfully',
            cheaterPhonesList: await exports.getCheaterPhones(),
            error: []
        });
    }
    catch (err) {
        await transaction.rollback();
        // req.flash('error', 'Creation failed: ' + err.message); // TODO
        res.render('pages/form_cheaterPhone', {
            success_msg: null,
            updateData: req.body,
            error: err
        });
    }
};
exports.createCheaterPhoneUser = async (req, res) => {
    transaction = await CheaterPhone.sequelize.transaction();
    try {
        req.params.phone = req.body.phone;
        let cheaterPhone = await exports.getCheaterPhoneForCreating(req, { transaction });
        if (!cheaterPhone) {
            cheaterPhone = await CheaterPhone.create(req.body, { transaction });
        }
        await PhoneDescription
            .create({ description: req.body.description, phoneId: cheaterPhone.id}, { transaction })
            .then(async (result) => {
                if (req.files) {
                    let data = [];
                    req.files.uploadedFile.forEach((file) => {
                        data.push({ proof: file.filename, descriptionId: result.id })
                    })
                    await Proof.bulkCreate(data, { transaction });
                }
            })
        await transaction.commit();
        res.status(200).json({ message: 'Cheater phone added' });
    } catch (err) {
        await transaction.rollback();
        // req.flash('error', 'Creation failed: ' + err.message); // TODO
        res.status(500).json(err);
    }
};
// READ (all categories)
exports.getCheaterPhones = async () => {
    try {
        return await CheaterPhone.findAll({
            include: [{
                model: User,
                as: 'user',
                attributes: ['id', 'name', 'email']
            }],
            include: [{
                model: PhoneDescription,
                as: 'descriptions',
                attributes: ['description']
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
            res.status(200).json(cheaterPhones);
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
        return await CheaterPhone.findOne({
            include: [{
                model: PhoneDescription,
                as: 'descriptions',
                attributes: ['description']
            }],
            where: {
                phone: req.params.phone,
                published: true
            }

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
        }
        else {
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
            res.render('pages/cheaterPhones', {
                success_msg: 'Phone updated successfully',
                cheaterPhonesList: await exports.getCheaterPhones(),
                error: []
            });
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
            res.status(200).json({ message: 'Phone deleted' });
        } else {
            req.flash('error', 'Phone deleted');
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCheaterPhoneAdmin = async (req) => {
    try {
        return await CheaterPhone.findByPk(req.params.id);
    } catch (err) {
        throw new Error(err.message);
    }
};

exports.getCheaterPhoneForCreating = async (req) => {
    try {
        return await CheaterPhone.findOne({
            include: [{
                model: PhoneDescription,
                as: 'descriptions',
                attributes: ['description']
            }],
            where: {
                phone: req.params.phone,
            }

        });
    } catch (err) {
        throw new Error(err.message);
    }
};

