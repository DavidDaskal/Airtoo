var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var request = require('request');
var flightInfo = require('../public/javascripts/nightsearch.js');

//Google API Key = AIzaSyCxqkWSV6F0DHTWoYU2ids-tJ--QnAhPPM
//https://www.youtube.com/watch?v=xDCKcNBFsuI --min 44.. express sessions explanation

var flight_data;

/* GET home page. */
router.get('/', function(req, res) {

res.render('index',{title:"Airtoo"});


});


    //res.sendFile(path.join(__dirname + '/index.html'));

router.get('/flightInfo', function(req,res){
  console.log('req.query',req.query);
  airchoice = req.query.airchoice;
	flight_number = req.query.flightnum;
  iphoneLoc = req.query.iphoneLoc;
  console.log()

  if (iphoneLoc){
  
  iphoneLoc = iphoneLoc.toString();
  iphoneLoc = iphoneLoc.replace(/,/g,'+');
  iphoneLoc = iphoneLoc.replace(/ /g ,'+'); 
  console.log('from index.js after replacements',iphoneLoc);
    }

  
   nightmare_cb = function(r){

    flight_data = {
    title:"Airtoo",
    flightnum : flight_number,
    airchoice:airchoice,
    airline: r.airline,
    arrival:r.arrival,
    departure_city:r.departure_city,
    arrival_city:r.arrival_city,
    arrival_date:r.arrival_date,
    departure_date:r.departure_date,
    takeoff_time:r.takeoff_time,
    gate_arrival_time:r.gate_arrival_time,
    iphoneLoc:iphoneLoc
    
  }
  res.render('index',flight_data);

}

flightInfo((flight_number),nightmare_cb);


  
});







// router.post('post', function(req,res){
//   console.log('req.body',req.body);
//   res.send('this is a post test');
// });

/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Time to Go' });
});*/

module.exports = router;
