
(function(){
	
	new Vue({
		el: document.loginForm,
		data: {
			nameError: false,
			pswError: false
		},
		methods: {
			loginHandler: function(evt){
				var data;
				
				if(this.verifyForm()){
					data = {
						username: this.username,
						password: this.password
					};
					ajax({
						type: 'POST',
						url: '/userLogin',
						data: data,
						onSuccess: function(data){
							data = JSON.parse(data)
							if(data.success){
								//跳转到首页
								window.location.href = "/app"
							}else{
								alert(data.msg)
							}
						}
					})
				}
			},
			inputChange: function(name, flag){
				console.log(name, flag)
				if(this[name]){
					this[flag] = false;
				}else{
					this[flag] = true;
				}
			},
			verifyForm: function(){
				var flag = true;
				
				if(!this.username){
					this.nameError = true;
					flag = false;
				}

				if(!this.password){
					this.pswError = true;
					flag =  false;
				}
				
				return flag;
			}
		}
	})
	
})();
