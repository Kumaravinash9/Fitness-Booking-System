const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const EventSchema = new Schema({

 event_type:{
   type: String,
   required: true
 },

 capacity:{
     type: Number,
     required: true,
     default:100
 },

 wait_list:[{
   id:{type: ObjectId, ref: 'user'},
   username: {
       type: String,
       required:true
   }
 }],

 registered_user:[{
     id: {type: ObjectId, ref: 'user'},
     username: {
        type: String,
        required:true
   }
}],

 created_at:{
    type:Date,
    default:Date.now()
 },

 start_time:{
     type: Number,
     required:true,
     default:0
 },

 duration:{
     type: Number,
     required:true,
     default:30
 }

});

/**
 * @type {Schema}
 */

module.exports = EventSchema;
