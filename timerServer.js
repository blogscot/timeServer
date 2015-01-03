var express = require('express');

var app = express();

function pad(num) {
	'use strict';
	if (num.toString().length < 2) {
		num = '0' + num;
	}
	return num;
}

function getCurrentTime() {
	'use strict';

	var date = new Date(),
	    year = date.getFullYear(),
	    month  = date.getMonth()+1, // month is zero indexed
	    day = date.getDate(),
	    hours = date.getHours(),
	    minutes = date.getMinutes();

	return year + '-' + pad(month) + '-' + pad(day) + ' ' + 
		pad(hours) + ':' + pad(minutes);
}

app.get('/time', function (req, res) {
	'use strict';
	res.send(getCurrentTime());
});

app.all('*', function(req, res, next){
	'use strict';
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Content-Type", "application/json");
  next();
});

app.listen(3000);