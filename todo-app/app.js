$("#add").click(function () {
  var inputTodo = $("#input-todo").val();
  $("#todo-list").append("<li>" + inputTodo + "</li>");
});

