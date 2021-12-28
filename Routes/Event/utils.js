

const HaveAlreadyRegistered = function(event, username){

  for(let x =0;x<event['registered_user'].length;x++)
   {
       if(event['registered_user'][x].username===username)
       {
           return true;
       }
   }
return false;
};

/**
 * @type {EventUtils}
 */
module.exports = {
    HaveAlreadyRegistered,
};
