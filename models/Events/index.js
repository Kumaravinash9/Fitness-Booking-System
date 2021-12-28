const mongoose = require('mongoose');
const Schema   = require('./schema');

// we can defined the mongoose function here for Event Schema Operations

/**
 * @type {Event Model}
 */

module.exports = mongoose.model('event', Schema);
