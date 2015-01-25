var express = require('express');

var app = express();
var port = process.env.PORT || 3000;

function pad(num) {
	'use strict';
	if (num.toString().length < 2) {
		num = '0' + num;
	}
	return num;
}

function getCurrentTime(format) {
	'use strict';

	var date = new Date(),
	    year = date.getFullYear(),
	    month  = date.getMonth() + 1, // month is zero indexed
	    day = date.getDate(),
	    hours = date.getHours(),
	    minutes = date.getMinutes(),
	    seconds = date.getSeconds();

	if (format === 'text') {
		return year + '-' + pad(month) + '-' + pad(day) + ' ' + 
			pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
	}
	
	return { 
		'year': year,
	  'month': pad(month),
	  'day': pad(day),
		'hours': pad(hours),
		'minutes': pad(minutes),
		'seconds': pad(seconds)
	};
}

app.all('*', function(req, res, next){
	'use strict';
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/', function (req, res) {
	'use strict';
  res.header("Content-Type", "application/text");
	res.send(getCurrentTime('text'));
});

app.get('/json', function (req, res) {
	'use strict';
  res.header("Content-Type", "application/json");
	res.send(getCurrentTime());
});

app.listen(port);