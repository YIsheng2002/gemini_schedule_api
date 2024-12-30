//constructor
const TodoTask = function(todoTask){
    this.id = todoTask.id;
    this.todoId = todoTask.todoId;
    this.title = todoTask.title;
    this.description = todoTask.description;
    this.isComplete = todoTask.isComplete;
    this.type = todoTask.type;
    this.startTime = todoTask.startTime;
    this.endTime = todoTask.endTime;
}

module.exports = { TodoTask };
