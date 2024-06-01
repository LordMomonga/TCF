const mongoose = require('mongoose');

const StudentResults = new mongoose.Schema({
    result_type: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "ResultType"
    },
    average: {
        type: Number
    },
    total_average: {
        type: Number
    },
    result_file: {
        type: String,
    },
    remark: {
        type: String,
    },
}, { timestamps: true });


module.exports = mongoose.model('StudentResults', StudentResults);
