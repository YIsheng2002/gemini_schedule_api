//constructor
const Todo = function(todo){
    this.id = todo.id;
    this.userId = todo.userId;
    this.date = todo.date;
    this.day = todo.day;
}

module.exports = { Todo };