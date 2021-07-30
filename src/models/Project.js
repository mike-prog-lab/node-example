const { Schema } = require('mongoose');

const schema = new Schema({
    name: String,
    description: String,
    priority: {
        type: Number,
        min: [0, 'Priority cannot be a negative number.'],
        max: [10, 'Priority cannot be higher then 10.'],
    },
});

module.exports = mongoose.model('Project', schema);
