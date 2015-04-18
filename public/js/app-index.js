
(function(){
	var NodeApp = function(){
		this.init()
	}
	
	$.extend(NodeApp.prototype,{
		init: function(){
			this.initEvts()
		},
		initEvts: function(){
			$("#addTodoBtn").click($.proxy(this.addTodo, this));
		},
		addTodo: function(){
			var values = $(document.todoForm).serialize();
			var modal = $("#myModal");
			
			modal.find(".modal-body").html(values);
			modal.modal("show");
			console.log(values)
		}
	});
	
	window.NodeApp = NodeApp;
})();

$(document).ready(function(){
	new NodeApp();
	
});
