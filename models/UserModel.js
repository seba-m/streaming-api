const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

var userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 18,
        max: 65,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    key: {
        type: String,
        required: true
    },
    socialAccounts: {
        type: Array,
        default: []
    },
    followers: {
        type: Number,
        default: 0
    },
    banner: {
        type: String,
        default: ""
    },
    profilePicture: {
        type: String,
        default: ""
    },
    streamData: {
        name:{
            type: String,
            required: true
        },
        about: {
            type: String,
            required: true
        },
        isLive: {
            type: Boolean,
            default: false
        },
        languages: {
            type: String,
            required: true,
            enum: ['español', 'english'],
            default: 'english'
        },
        streamStartTime: {
            type: Date,
            default: Date.now
        },
        title: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        category: [{
            type: String,
            enum: ['gaming', 'music', 'coding', 'sports', 'other'],
            default: 'other'
        }],
        viewers: {
            type: Number,
            default: 0
        }
    }
});

userSchema.plugin(mongoosePaginate);
userSchema.plugin(mongooseUniqueValidator); 
module.exports = mongoose.model('User', userSchema);