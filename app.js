const   express     = require('express'),
        app         = express(),
        bodyParser  = require('body-parser'),
        path        = require('path'),
        port        = process.env.PORT || 3000;

const mongoose = require('mongoose');
const CONNECTION_URI = process.env.MONGOLAB_URI || 'mongodb://localhost/gezilecekYerler';

mongoose.Promise = global.Promise;
mongoose.set('debug', true);


mongoose
    .connect(CONNECTION_URI, {
        useMongoClient: true
    })
    .then(() => {
        console.log('connected to mongodb')
    })
    .catch(err => console.log(err));



const yerlerRoutes = require('./routes/yerler');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/tekSayfa/anasayfa.html');
})

app.use('/api/yerler', yerlerRoutes);



app.listen(port, () => {
    console.log('%d portunda', port);
})