var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




router.get('/api', function(req,res,next){
 var client = new Client();
 var args = {
  body: {
   q: "Im allie"
  },
  headers: {
   Authorization: 'Bearer 5OCANSDN37ESNPMEARLQ6KDYNGTM355X'
  },
  dataType: 'jsonp'
 }
 client.post('https://api.wit.ai/message', args, function(res, data) {
  console.log(data)
  console.log(res)
 })

})
module.exports = router;
