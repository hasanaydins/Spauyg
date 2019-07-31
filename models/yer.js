const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gezilecekYerler');
mongoose.set('debug', true);

mongoose.Promise = Promise;


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