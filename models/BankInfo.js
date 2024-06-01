const mongoose = require('mongoose');

const BankInfo = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    account_number: {
        type: String,
        required: true
    },
    school_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },
}, { timestamps: true });


module.exports = mongoose.model('BankInfo', BankInfo);
