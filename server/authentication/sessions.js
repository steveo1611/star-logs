let expressSession = require('express-session');
let MongoDBStore = require('connect-mongodb-session')(expressSession);
//var env = require('../config/env')

//console.log(process.env.CONNECTIONSTRING)mongodb://<dbuser>:<dbpassword>@ds133360.mlab.com:33360/star-log-eric-steve

var store = new MongoDBStore({
	uri: "mongodb://testing123:testing123@ds133360.mlab.com:33360/star-log-eric-steve", //CHANGE ME!!!!!!
	collection: "Sessions"
	});

// Catch errors 
store.on('error', function (error) {
	console.error(error);
});


// module.exports = session({
var session = expressSession({
	secret: 'It\'s dangerous to go alone',
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week 
	},
	store: store,
	resave: true,
	saveUninitialized: true
});

module.exports = session;