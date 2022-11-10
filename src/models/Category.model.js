const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

var categorySchema = new Schema({
    _id: {
        type: String,
        default: function () {
            return this.name.split(' ').join('_');
        },
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    spectators: {
        type: Number,
        default: 0
    },
    tags: [{
        type: [{
            type: String,
            maxlength: 10
        }],
        validate: [(val) => {
            return val.length <= 5;
        },
            'Tags exceeds the limit of 5'],
        default: []
    }],
});

categorySchema.plugin(mongoosePaginate);
categorySchema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('Category', categorySchema);