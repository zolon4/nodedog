var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;
var client = new Client();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/simSimi/:text', function(req,res,next) {
  var text = req.params.text
 client.get("http://api.simsimi.com/request.p?key=" + process.env.SIMUPDOG+ "&lc=en&ft=1.0&text="+ text + "&callback=", function(data,response) {
   res.json(data)
 })
})

module.exports = router;
