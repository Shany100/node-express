var express = require('express');
var app = express();
var appRouter = require('./routers/app-router.js');

app.set("views", './views');
app.set("view engine", 'jade');

app.get("/", function(req, res){
//	res.send("index");
	res.sendFile(__dirname + "/index.html");
});

app.get("/about", function(req, res){
	res.send("about me. uncompleted!")
});

app.use("/app", appRouter)

app.use(express.static(__dirname + '/public'));
app.listen(3000);
console.log("Server running at http://localhost:3000");
