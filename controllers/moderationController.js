const { CheaterPhone, PhoneDescription, Proof } = require('../models');

// READ (all categories)
exports.getPhonesToModerate = async () => {
    try {
        return await CheaterPhone.findAll({
            include: [{
                model: PhoneDescription,
                as: 'descriptions',
                where: { approved: false }
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
                attributes: ['description'],
                include: [{
                    model: Proof,
                    as: 'proofs',
                    attributes: ['proof'],
                }]
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
