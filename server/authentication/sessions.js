let expressSession = require('express-session');
let mongoDBStore = require('connect-mongodb-session')(expressSession);
//var env = require('../config/env')

//console.log(process.env.CONNECTIONSTRING)mongodb://<dbuser>:<dbpassword>@ds133360.mlab.com:33360/star-log-eric-steve

var store = new mongoDBStore({
	uri: "mongodb://testing123:testing123@ds133360.mlab.com:33360/star-log-eric-steve", //CHANGE ME!!!!!!
	collection: "Sessions"
	});

// Catch errors 
store.on('error', function (err) {
	console.error(err);
});


// module.exports = session({
var session = expressSession({
	secret: 'bleeeeeeep',
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week 
	},
	store,
	resave: true,
	saveUninitialized: true
});

module.exports = session;
