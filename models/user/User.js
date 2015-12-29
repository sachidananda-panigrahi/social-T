// Dependencies
var mongoose = require('mongoose');
var CONSTANT = require('../../utilities/Constant').CONSTANTS;

// Model Definition
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    role: String,
    status: String,
    first_time_login: Number,
    modified_by: String,
    modified_at: Date
});

// Export module.
module.exports = mongoose.model(CONSTANT.DOCUMENT_NAMES.USER, userSchema);