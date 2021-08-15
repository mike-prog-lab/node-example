const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: {
        type: String,
        required: [true, "The project name must be provided."]
    },
    description: {
        type: String,
        required: [true, "The project description must be provided."]
    },
    priority: {
        type: Number,
        min: [0, 'Priority cannot be a negative number.'],
        max: [10, 'Priority cannot be higher then 10.'],
        default: 0
    },
});

module.exports = mongoose.model('Project', schema);
