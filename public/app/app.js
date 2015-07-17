Vue.config.debug = true

var TodoFormComponent;

var routes = {
  'viewtodolist': function(){
    mainView.currentView = "todolist-component"
  },
  '/viewtodo': function(){

    if(!TodoFormComponent){
      $.ajax({
        url: '/load/loadTodoForm',
        success: function(data){
          TodoFormComponent = Vue.extend({
            template: data,
            methods: {
              onClick: function(){
                this.submit();
              },
              submit: function(){
                var formData = {
                  content: this.content,
                  title: this.title
                }
                $.ajax({
                  method: 'POST',
                  contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                  url: "/load/saveTodo",
                  dataType: 'json',
                  data: formData,
                  success: function(result){
                    alert(JSON.stringify(result))
                    window.location.hash = "/viewtodolist"
                  }
                })
              }
            },
            data: function(){
              return {
                name: "赶紧干活",
                url: ""
              }
            }
          })

          Vue.component('todo-component', TodoFormComponent)
          mainView.currentView = 'todo-component';
        }
      })
    }else{
      mainView.currentView = 'todo-component';
    }

  },
  '/viewemploy': function(){
    // $("#mainView").hide("fast")
    mainView.currentView = 'employ-component'
  },
  '/viewarticle': function(){
    mainView.currentView = 'blog-component'
  }
}

var TodoListTpl = [
  '<h3>待办信息列表 <input class="btn btn-default navbar-right" type="button" value="添加待办" v-on="click: addHandler"></h3>',
  '<ul class="list-group" wait-for="data-loaded">',
  '<li class="list-group-item" v-repeat="todo: todoList">{{ todo.title }}</li>',
  '</ul>'
].join("");
var TodoListComponent = Vue.extend({
  template: TodoListTpl,
  methods: {
    addHandler: function(){
      window.location.hash = "/viewtodo"
    }
  },
  compiled: function(){
    var _this = this;

    $.ajax({
      url: "/load/listTodos",
      dataType: 'json',
      success: function(result){
        _this.$data = {
          todoList: result
        }
        _this.$emit("data-loaded");
      }
    })
  }
})

Vue.component('todolist-component', TodoListComponent)

var EmployListComponent = Vue.extend({
  template: "A Employ List Component.",
  data: function(){
    return {
      name: "求工程师",
      url: ""
    }
  }
})

Vue.component('employ-component', EmployListComponent)

var BlogListComponent = Vue.extend({
  template: "A Blog List Component.",
  data: function(){
    return {
      name: "求工程师",
      url: ""
    }
  }
})

Vue.component('blog-component', BlogListComponent)

var mainView = new Vue({
  el: "#mainView",
  data: {
    currentView: 'todolist-component'
  }
})

Router(routes).init()
