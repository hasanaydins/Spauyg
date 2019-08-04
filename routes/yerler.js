const  express = require('express'),
        router = express.Router(),
        Yer = require('../models/yer');

module.exports = router;

router.get('/', (req,res) =>{
    Yer.find()
    .then((yerlerdb) => {
        res.json(yerlerdb);
    })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
})

router.post('/', (req,res) => {
    console.log(req.body);
    Yer.create(req.body)
        .then((yeniYer) => {
            res.status(201).json(yeniYer);
        })
        .catch((err) => {
            console.log('----hata---');
            console.log(err);
            res.send(err);
        })
})

router.get('/:yerID', (req, res) => {
   Yer.findById(req.params.yerID)
       .then((bulunanYer) => {
           res.json(bulunanYer);
       })
       .catch((err) => {
           console.log('---hata----');
           console.log(err);
           res.send(err)
       })

});

router.put('/home/:yerId', (req, res) => {
   Yer.findByIdAndUpdate({_id: req.params.yerId}, req.body, {new: true})
       .then((yer) => {
           res.json(yer);
       })
       .catch((err) => {
           console.log('---hata----');
           console.log(err);
           res.send(err)
       })

});

router.delete('/:silId', (req, res) => {
   Yer.remove({_id: req.params.silId})
       .then(() => {
           res.json('silindi');
       })
       .catch((err) => {
           console.log('---hata----');
           console.log(err);
           res.send(err)
       })
});