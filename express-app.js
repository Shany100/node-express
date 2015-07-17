var express = require('express');
var session = require('express-session')
var bodyParser = require('body-parser')
var app = express();
var appRouter = require('./routers/app-router.js');

app.set("views", './views');
app.set("view engine", 'jade');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(session({
	secret: 'jiang'
}));

// 不需要登录的路由
var nomarlUrls = [
	"/login",
	"/userLogin",
	"/frames",
	"/tool_articles",
	"/app"
];

//登录拦截
app.use(function(req, res, next){
	console.log("登录拦截");
	if(nomarlUrls.indexOf(req.originalUrl) === -1 && !req.session.user){
		return res.redirect("/login")
	}
	next();
});

//res.locals
app.use(function(req, res, next){
	console.log("set res.locals")
	next()
})

app.get("/login", function(req, res){
	//res.send("please login first.")
	res.render("login", {msg: '用户登录'})
});

app.post("/userLogin", function(req, res, next){
	var userController = require("./controllers/user-controller");
	userController.checkUser(req, res, next, session);
	//res.render("login", {msg: '用户登录'})
});

app.get("/logout", function(req, res, next){
	req.session.user = null;
	app.locals.appUserInfo = null;
	res.redirect("/login")
})

app.get("/", function(req, res){
	//res.send("index");
	res.sendFile(__dirname + "/index.html");
});

app.get("/about", function(req, res){
	res.render("about", {})
});

app.use("/app", appRouter)
app.use("/load", require("./routers/view-router.js"))

app.use("/frames", function(req, res){
//	res.send("前端框架")
	var frame = require("./models/articles.js");
	res.render("frames", {
		msg: '前端框架',
		articles: frame.articles,
		frames: frame.frames
	});
});

app.use('/tool_articles', function(req, res){
	var toolArticles = require('./models/tools.js')
	res.render('tool-articles', {
		msg: '工具文章集',
		toolArticles: toolArticles.toolArticles
	})
})

app.listen(3000);
console.log("Server running at http://localhost:3000");

// $ supervisor express-app
