
var dbConfig = require("../config/db");
var knex = require("knex")(dbConfig);

var bookshelf = require("bookshelf")(knex);

var Todo = bookshelf.Model.extend({
	tableName: "todo",

});

module.exports = {
  saveTodo: function(todo, res){
      new Todo(todo).save().then(function(model){
        res.json({
          success: true,
          msg: "success"
        })
      })
  },
  listTodos: function(res){
    Todo.fetchAll().then(function(model){
      res.json(model)
    })
  }
}
