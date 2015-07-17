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
		name: "待办信息",
		title: "待办信息",
		url: "/viewtodolist"
	},{
		name: "招聘信息",
		title: "招聘信息",
		url: "/viewemploy"
	},{
		name: "博客文章",
		title: "文章内容",
		url: "/viewarticle"
	}];

	var data = _.assign({msg: "App 首页"},{navs: navs});

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
