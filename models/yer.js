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



let yerSchema = new mongoose.Schema({
    isim: {
        type: String,
        required: 'Bos olamaz'
    },
    ziyaret: {
        type: Boolean,
        default: false
    },

    olusturulmaTarihi: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Yer', yerSchema);