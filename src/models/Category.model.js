const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

var categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    spectators: {
        type: Number,
        default: 0
    },
    tags: {
        type: [String],
        default: []
    },
});

categorySchema.plugin(mongoosePaginate);
categorySchema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('Category', categorySchema);