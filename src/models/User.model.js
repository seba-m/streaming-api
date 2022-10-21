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
    birthDate: {
        type: Date,
        min: '1900-01-01',
        max: Date.now(),
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
    about: {
        type: String,
        maxlength: 200,
        required: false
    },
    streamData: {
        name:{
            type: String,
            required: true,
            default: function () { 
                return this.userName; 
            },
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
            maxlength: 75,
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