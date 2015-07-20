var express = require('express');
var app = express();
var fs = require("fs");

/**
 * Route Service
 */
var routes;
function readRoutes(callback) {
	fs.readFile(__dirname + "/routes.json", 'utf8', function(err, data) {
		var result = JSON.parse(data);
		callback(result);
	});
}
function getRoutes(callback) {
	if (routes === undefined) {
		readRoutes(function(data) {
			routes = data;
			callback(routes);
		});
	} else {
		callback(routes);
	}
}

/**
 * API Resources
 */
app.get('/routes', function(req, res) {
	getRoutes(function(data) {
		res.end(JSON.stringify(routes));
	});
})

/**
 * Find stations for a given route id
 */
app.get('/routes/:routeid/stations', function(req, res) {
	var routeId = req.params.routeid;

	var route = getRoutes(function(routes) {
		var selectedRoute = routes[routeId];
		if (selectedRoute !== undefined) {
			res.end(JSON.stringify(selectedRoute.stations));
		} else {
			res.status(404).send('Route id is unknown.');
		}
	})
})

/**
 * Find tips for a given route id
 */
app.get('/routes/:routeid/trips', function(req, res) {
	var routeId = req.params.routeid;

	var route = getRoutes(function(routes) {
		var selectedRoute = routes[routeId];
		if (selectedRoute !== undefined) {
			res.end(JSON.stringify(selectedRoute.trips));
		} else {
			res.status(404).send('Route id is unknown.');
		}
	})
})

/**
 * Server init
 */
app.use("/", express.static('C:/Users/dominik/git/michaelruf/'));

var server = app.listen(53487, function() {

	var host = server.address().address
	var port = server.address().port

	console.log("listening at http://%s:%s", host, port);

})