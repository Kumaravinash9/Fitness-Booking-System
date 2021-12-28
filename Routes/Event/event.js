const express = require('express');
const route = express.Router();
const ApiError = require('../../utils/error');
const ApiSuccess = require('../../utils/success');
const Event  = require('../../models/Events/index');
const User   = require('../../models/User/index');
const {HaveAlreadyRegistered} = require('./utils');


// create a Event
route.post('/', (req, res, next) => {
    console.log(req.body.event_type);
  Event.create(req.body, function(err, event ){
    if(err)
    {
      console.log(err);
      res.status(404).json(new ApiError());
    }
    else{
        res.status(201).json(new ApiSuccess(event));
    }
  });
});


// User Booking
route.get('/:event_id/registerevent', async (req, res, next) => {
const  username = req.headers.username;
const  eventid = req.params.event_id;
console.log(username, eventid);
const event = await Event.findById(eventid).exec();
const haveRegistered =   HaveAlreadyRegistered(event, username);
const user = await User.findOne({username}).exec();
if(user!=null && !haveRegistered){
Event.findById(eventid, function(err, event){
if(err)
console.log(err);
else{
// When Event Capacity is filled
 if(event['registered_user']>= event['capacity'])
 {
 // put the user in waiting list
    Event.updateOne(

        { _id: eventid },
        {
            $push: {
                wait_list: {
                    id: user._id,
                    username: user.username,
                },
            },
        },
        function (err, newevent) {
            if (err) console.log(err);
            else
              {
                console.log(newevent);
            }
        });

     res.status(200).json(new ApiSuccess('No avaiable space vaccant!. Put you in the waiting list'));

 }
 else{

    // successfully registered the user for the given event
    Event.update(

        { _id: eventid },
        {
            $push: {
                registered_user: {
                    id: user._id,
                    username: user.username,
                },
            },
        },
        function (err, newevent) {
            if (err) console.log(err);
            else
               {
               console.log(newevent);
            }
        });
        res.status(200).json(new ApiSuccess('Sucessfully Registered for the event'));
 }
}});
}
else
    res.status(200).json(new ApiError());
});

/**
 * @type {Event Routes}
 */

module.exports = route;
