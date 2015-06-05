var express = require('express');
var session = require('express-session')
var router = express.Router();
var _ = require('lodash');

router.use(function timeLog(req, res, next){
	console.log("Time: " + Date.now())
	next()
});

router.get("/", function(req, res){
	var navs = [{
		name: "添加待办信息",
		title: "待办信息",
		url: "/app/viewtodo"
	},{
		name: "添加招聘信息",
		title: "招聘信息",
		url: "/app/viewemploy"
	},{
		name: "添加文章内容",
		title: "文章内容",
		url: "/app/viewarticle"
	}];
	
	var data = _.assign({msg: "录信息表单"},{navs: navs});
	
	res.render("index", data);	
})

router.get("/index", function(req, res){
	console.log("app-router __dirname: " + __dirname)
	
	res.cookie("app-router", "APPROUTER_ACCESSS")
	res.redirect("/");
})

router.get("/about", function(req, res){
	var userInfo = req.session.user
	var infoset = JSON.stringify(req.session.user)
	
	userInfo.password = "**********"
	res.render("user-about", {user: userInfo, infoset: infoset})
	//res.send("access success. /app/about")
})

module.exports = router;
