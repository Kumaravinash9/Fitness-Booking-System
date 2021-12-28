/* eslint-disable quotes */
const express = require('express');
const route = express.Router();
const ApiError = require('../../utils/error');
const ApiSuccess = require('../../utils/success');
const Event  = require('../../models/Events/index');
const User = require('../../models/User');
const {HaveAlreadyRegistered} = require('./utils');

// create User
route.post('/', (req, res, next) => {
    User.create(req.body, (err, user) => {
      if(err)
      {
          console.log(err);
          res.status(404).json(new ApiError(err));
      }
      else res.json( new ApiSuccess(user));
    });
});


// Cancel  Event  API
route.get('/:username/cancelevent', async (req, res, next) => {
    const  eventid = req.headers.eventid;
    console.log(eventid);
    const  time = req.headers.time;
    const  events = await Event.findById(eventid).exec();
    const user =  await User.findOne({username:req.params.username}).exec();
    const haveRegistered =   HaveAlreadyRegistered(events, user.username);
    if(user!=null && haveRegistered){
    Event.findById(eventid, function(err, event){
    // When Event startTime is greater than 30 mins
    console.log(event['start_time']);
     if(event['start_time']>= time+30)
     {
     // remove the user from the registered user
     Event.update(
        { _id: eventid },
        {
            $pull: {
                "registered_user": {
                    username: user.username
                },
            }
        },
        function (err, updatedevent) {
            console.log(updatedevent);
        });

     if(event['wait_list'].length>0){
     // retrieve the first  User from the waiting list
     const  newuser = Event.findById({_id: eventid}, {wait_list:{$slice:1}}).exec();
     // remove the first   user  from the  waiting list
        Event.update(
            { _id: eventid },
            {
                $pop: {
                    wait_list:-1,
                },
            },
            function (err, updatedevent) {
                if (err) console.log(err);
                else
                console.log(updatedevent);
            });

         // insert first waiting user  into  registered list
            Event.updateOne(
                { _id: eventid },
                {
                    $push: {
                        registered_user: {
                            id: newuser._id,
                            username: newuser.username,
                        },
                    },
                },
                function (err, updatedevent) {
                    if (err) console.log(err);
                    else
                    console.log(updatedevent);
                });
            }

         res.status(200).json(new ApiSuccess(' successfully! Cancel the class'));
     }
     else
     {
        res.status(200).json(new ApiSuccess('Not Posssible to cancel the class'));
     }
    });
    }
    else
        res.status(404).json(new ApiError());
    });


/**
 * @type {UserRoutes}
 */

 module.exports = route;
