var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;
var client = new Client();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/wit/:q', function(req,res,next) {
  var q = req.params.q
  var args = {
    headers: {
      "Authorization": " Bearer " + process.env.UPDOG_WIT
    }
  }
  client.post(`https://api.wit.ai/message?q=${q}`, args, function(data, response) {
    res.json(data)
  })
})


router.get('/forecast/:lat,:lng', function(req,res,next){
  var lat = req.params.lat
  var lng = req.params.lng
  client.get(`https://api.forecast.io/forecast/${process.env.FORECAST}/${lat},${lng}`, function(data, response) {
    res.json(data)

  })
})

router.get('/geocode/:city', function(req,res,next) {
  var city = req.params.city
  client.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${process.env.GOOGLE_API}`, function(data, response){
    res.json(data)

  })
})



module.exports = router;
