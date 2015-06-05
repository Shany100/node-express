
var dbConfig = require("../config/db");
var knex = require("knex")(dbConfig);

var bookshelf = require("bookshelf")(knex);

var User = bookshelf.Model.extend({
	tableName: "user",
	
});

module.exports = User;