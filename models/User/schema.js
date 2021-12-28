const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
 name:{
     type:String,
 },

 username:{
     type: String,
     required:true,
     unique:true,
 },
});

/**
 * @type { User Schema}
 */

module.exports = UserSchema;
