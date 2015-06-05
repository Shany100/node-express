
var User = require("../models/user");

module.exports = {
	// 判断用户是否存在
	checkUser: function(req, res, next, session){
		var userName = req.body.username;
		var password = req.body.password;
		console.log(userName, password)
		User.forge({
			username: userName, 
			password: password
		})
		.fetch()
		.then(function(model){
			if(model){
				req.session.user = model.toJSON();
				req.app.locals.appUserInfo = model.toJSON();
				res.json({
					success: true,
					userInfo: model.toJSON()
				})
			}else{
				res.json({
					success: false,
					msg: "user not exit."
				})
			}
		})
		.catch(function(error){
			res.status(500).json({
				msg: error.message
			})
		});
	},
	//添加用户
	saveUser: function(req, res, next){},
	//更新用户信息
	updateUser: function(req, res, next){}
}
