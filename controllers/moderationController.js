const { CheaterPhone, PhoneDescription, Proof } = require('../models');

// READ (all phones to moderate)
exports.getPhonesToModerate = async () => {
    try {
        return await CheaterPhone.findAll({
            include: [{
                model: PhoneDescription,
                as: 'descriptions',
                where: {
                    approved: false
                }
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

exports.getPhoneWithInfo = async (req) => {
    try {
        return await CheaterPhone.findOne({
            include: [{
                model: PhoneDescription,
                as: 'descriptions',
                attributes: ['id', 'description', 'approved'],
                include: [{
                    model: Proof,
                    as: 'proofs',
                    attributes: ['proof'],
                }]
            }],
            where: {
                id: req.params.id
            }
        });
    } catch (err) {
        throw new Error(err.message);
    }
};

//SWITCH APPROVED FIELD

exports.deleteDescription = async (req, res) => {
    try {
        
        const cheaterPhone = await PhoneDescription.findByPk(req.params.id, {
            include: [{
                model: Proof,
                as: 'proofs'

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

exports.publishCheaterPhone = async (req, res) => {
    transaction = await CheaterPhone.sequelize.transaction();
    try {
        if (req.body.descriptionsId) {
            await PhoneDescription.update({ approved: true }, {
                where: {
                    id: req.body.descriptionsId
                }
            }, { transaction });
            const numberOfchecks = Array.isArray(req.body.descriptionsId) ? req.body.descriptionsId.length : 1;
            if (numberOfchecks == req.body.number) {
                const phone = await CheaterPhone.findByPk(req.params.id, { transaction });
                await phone.update({
                    published: true
                }, { transaction });
            }
            await transaction.commit();
            res.render('pages/moderation', {
                success_msg: 'Phone published successfully',
                phonesToModerateList: await exports.getPhonesToModerate(),
                error: []
            });
        }
        else {
            res.redirect('/tables/moderation');
        }
    } catch (err) {
        await transaction.rollback();
        res.status(500).json({ message: err.message });
    }

};