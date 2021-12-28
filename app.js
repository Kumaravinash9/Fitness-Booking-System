const     express      = require('express');
const     cat          = require('cat-me');
const     dotenv       = require('dotenv');
const  bodyParser      = require('body-parser');
const    cors          = require('cors');
const   UserAPI        = require('./Routes/User/user');
const   EventAPI       = require('./Routes/Event/event');
const   mongoose        = require('mongoose');
const app = express();


dotenv.config({
 path:'config.env'
});

app.use(cors());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());

// Routes

app.get('/', (req, res, next) => {
res.status(200).json('Everything is working fine !');
});

app.use('/users', UserAPI);
app.use('/events', EventAPI);


app.get('*', (req, res, next) => {
    res.status(404).json('No request is avaiable');
});

/**
 * @dbconfig {database configuration}
 */

// local db
mongoose.connect('mongodb://localhost:27017/UdaanBooking', {useNewUrlParser:true});

mongoose.connection.on('connected', () => {
    console.log('it is Connected Now');
});

mongoose.connection.on('error', () => {
    console.log('anything is garbar ');
});


// server listen at Port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(cat(), ' Meow ! Server has started');
});
