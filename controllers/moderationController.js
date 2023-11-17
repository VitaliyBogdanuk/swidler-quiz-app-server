const { CheaterPhone, PhoneDescription, Proof } = require('../models');

// READ (all phones to moderate)
exports.getPhonesToModerate = async () => {
    try {
        return await CheaterPhone.findAll({
            include: [{
                model: PhoneDescription,
                as: 'descriptions'
            }
            ],
            order: [
                ['id', 'ASC']
            ],
            where: {
                published: false
            }
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
                attributes: ['id','description','approved'],
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

exports.updateApprovedDescription = async (req, res) => {
    try {
        const description = await PhoneDescription.findByPk(req.params.id);
        const result = description.approved ? false : true;
        await description.update({approved: result
        });
        res.status(200).json({ message: 'Updated successfully', user: user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

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
            // req.flash('success_msg', 'Category successfully deleted!'); // TODO
            res.status(200).json({ message: 'Phone deleted' });
        } else {
            req.flash('error', 'Phone deleted');
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (err) {
        // req.flash('error', 'Deleting failed: ' + err.message); // TODO
        res.status(500).json({ message: err.message });
    }
};