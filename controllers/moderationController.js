const { CheaterPhone, PhoneDescription } = require('../models');

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

