const mongoose = require('mongoose');
const Schema   = require('./schema');

// we can defined the mongoose function here for Event Schema Operations

/**
 * @type {User Model}
 */

module.exports = mongoose.model('user', Schema);
