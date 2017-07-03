var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;
var client = new Client();
var pry = require('pryjs')
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/wit/:q', function(req,res,next) {
  var q = req.params.q
  var params = {  headers: { "Authorization": `Bearer ${process.env.UPDOG_WIT}` } }
  client.post(`https://api.wit.ai/message?q=${q}`, params, function(data, response) {
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


router.get('/spotify/:q', function(req,res,next) {
  var q = req.params.q
  var b = new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET);
  var credentials = b.toString('base64');
  var headers = {
    headers: {
      "Authorization": `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  }
  client.post(`https://accounts.spotify.com/api/token?grant_type=client_credentials`, headers, function(data, response) {
    if(!data.error) {
      var token = data.access_token
      client.get(`https://api.spotify.com/v1/search?q=${q}&type=artist&access_token=${token}`, function(data, response){
        res.json({uri: data.artists.items[0].uri})
      })
    }
  })

})


module.exports = router;
