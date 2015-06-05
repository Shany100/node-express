
var User = require("../models/user");

var user = new User({
	username: 'jiangtao'
});

// save: insert a record into user table
/*user.save().then(function(record){
	console.log(record.get("email"));
})*/

user.fetch().then(function(model){
	if(model){
		console.log(model.get("id"))
	}
})
