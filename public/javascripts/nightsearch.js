var jquery = require('jquery')
// jquery allows easy selection of css/html elements in the dom
var Nightmare = require('nightmare'),
  nightmare = Nightmare({ show: false });
// nightmare is a simple wrapper for PhantomJS for web automation and scraping


// use the first argument passed as the city to be searched

 var flightData = function(flightnum,cb) {

 

	 nightmare.goto('https://flightaware.com/live/flight/'+flightnum)

	// visits the city specified by the user and gets all computer gigs posted that day
	.wait(500)
	// wait 2 seconds so page is guaranteed to be fully loaded
	.evaluate(function(){

	flight_data ={
		airline: "",
 		arrival:"",
 		departure_city:"",
 		arrival_city:"",
 		arrival_date:"",
 		departure_date:"",
 		takeoff_time:"",
 		gate_arrival_time:""

 	} 

		// create an array to hold all gigs gathered by following code
		$('.flightPageSummaryStatus').each(function(){

			data = $(this);
			flight_data.arrival = data.text();
		})
		//** to get destination city
		// $('.destinationCity').each(function(){
		// 	flight_data.arrival_city = dest.text();
		// })
		$('.flightPageSummaryAirports').each(function(){
			airport_info = $(this);
			routes = airport_info.text().toString();
			//flight_data.initialstring = routes + typeof routes;
			routes = routes.trim();
			split = routes.split(", ");
			//flight_data.initialstring_split = split;
			city_split =  split[1].split(/\n/);
			mid_city = [];

			for (i=0;i<city_split.length;i++){
				if (city_split[i]!=""){
					mid_city.push(city_split[i]);
				}
			}		
			//flight_data.mid_city = mid_city;
			flight_data.departure_city = split[0]+" "+mid_city[0];
			flight_data.arrival_city = mid_city[1]+" "+mid_city[2]+" "+split[split.length - 1];

		})
		$('.flightPageSummaryArrivalDay').each(function(){
			date = $(this);
			date = date.text().toString();
			flight_data.arrival_date = date;
		})
		$('.flightPageSummaryDepartureDay').each(function(){
			depart = $(this);
			depart = depart.text().toString();
			flight_data.departure_date = depart;
		})
		$('.flightPageSummaryDeparture').each(function(){
			takeoff = $(this);
			takeoff = takeoff.text().toString();
			flight_data.takeoff_time = takeoff;
		})
		$('.flightPageSummaryArrival').each(function(){
			gateArr = $(this);
			gateArr = gateArr.text().toString();
			flight_data.gate_arrival_time = gateArr;
		})
		$('.flightPageFriendlyIdentLbl').each(function(){
			airline = $(this);
			airline = airline.text().toString();
			flight_data.airline = airline;
		})
		// })
		// create a gig object with title and link, then push to the 'gigs' array
		return flight_data;
		// pass the gigs array forward so it can be looped through later on
	})
	.then(function(result){
		r = result;
		console.log('result from server',r);
		return cb(r);
		})
	.catch(error => {
      	console.log(error);
      });
  
 }



module.exports = flightData;
   

	
	// .evaluate(() => { })
 //    .then(() => someFunction(nightmare))
 //    .catch(error => {
 //      return someFunction(nightmare);
 //    })
 //    .catch();









