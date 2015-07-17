var express = require("express")
var router = express.Router();

router.use(function(req, res, next){
  next()
})

router.get("/loadTodoForm", function(req, res, next){
  var jade = require('jade')
  var html = jade.renderFile('views/forms/todo.jade')
  res.end(html);
})

router.post("/saveTodo", function(req, res, next){
  console.log(req.body);
  var todoModel = require("../models/todo.js")

  todoModel.saveTodo(req.body, res);
})

router.get("/listTodos", function(req, res, next){
  var todoModel = require("../models/todo.js")

  todoList = todoModel.listTodos(res) // list all
})

module.exports = router;
