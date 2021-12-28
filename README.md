
# Udaan Machine Coding :
 
 
**Goals (completed) :**

* Desgined a  POST API which creates new user with unique username :
 As mentioned in the Question, we  donot have to create a User authentication. So for Indentification  I used username as a identification for the user.
 
 Route :   `http://localhost:3000/users/ `  

![UdaanUserIdentificationAPI](https://user-images.githubusercontent.com/64456168/141971060-7c04f680-121e-4085-bea4-ca378ad443f6.PNG)


* Designed a POST request API for creating *Event* :

Route: `http://localhost:3000/events/`
 Required Body:
```
{
	"event_type": "yoga",
	"capacity":60,
	"start_time":30,
	"duration": 30
}

```
![CreateEvent](https://user-images.githubusercontent.com/64456168/141974230-89206ac9-4463-4a06-ab2f-9d516b6309d1.PNG)

* Desgined a API for registering the Event :

Cases Handled:
* If user have already registered for the event , they willn't able to  register again.
* If event's capacity have exceeded then user push into waiting list
* If event's capacity haven't exceeded then user able to register the event.

Route: `http://localhost:3000/events/:eventid/regsiterevent`
Headers Required :
```
   username : (since i used username as identification. so it is required)
```

![Registered_event](https://user-images.githubusercontent.com/64456168/141973161-1795d6a5-0198-4b34-bf73-83013f7bd474.PNG)

* Desgined a API by which user can cancel their registeration 30minutes before the event start

Cases Handled:
 * User can able to cancel the event 30 min before the event start
 * If user can able to cancle then it automatically confirm the registration of  the first waiting user into main list if any waitlist user exits.
 
 Route : `http://localhost:3000/users/:username/cancelevent`

Headers Required:
```
eventid : (Id of the Event that user want to cancel) (required)
time: (time in minutes when user want to try  to cancel the registered  event)  (required)

```

![CancelEventAPI](https://user-images.githubusercontent.com/64456168/141975709-d63688b7-c8b2-46e4-8b07-80d0ca68da66.PNG)

### Prerequisites

* `node: v16.13.0`
* `npm: 8.1.0`
* `MongoDb`

### Development

   **Dependencies**
   
   
        express
        ejs
        BodyParser
        path
        dotenv
        mongoose
        eslint
        nodemon
        eslint-plugin-prettier
        cors
        mongoose
        
        
      
   **Database**
   
        (1). MongoDb (locally  setup)
        
        
        
## Installing on Local Machine

* `cd Udaan/`
* `npm install`
* `npm start/nodemon`
* `install mongoose local`

#### Build and load the app
* `npm install`
* `npm start`
* run `localhost:3000` in the browser 

### API testing :
* `PostMan`

#### Code linting and formatting
Udaan Class Booking System uses **Prettier + Eslint** for code listing and formatting. To check if your code follows the guidelines, run `npm run prettier`

