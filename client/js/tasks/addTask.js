var AddTask = (function () {
    function AddTask() {
        this.name = "addTask";
        this.loadModule();
    }
    AddTask.prototype.generateHtml = function () {
        return "\n\t\t\t<label>Task Title</label>\n\t\t\t<input type=\"text\" id=\"task\" class=\"form-control\" required />\n\t\t\t<br>\n\t\t\t<label>Task Category</label>\n\t\t\t<input type=\"text\" id=\"category\" class=\"form-control\" required />\n\t\t\t<br>\n\t\t\t<label>Task Details</label>\n\t\t\t<textarea class=\"form-control\" id=\"details\"></textarea>\n\t\t\t<br>\n\t\t\t<label>Date Due</label>\n\t\t\t<input class=\"form-control\" id=\"dueDate\" type=\"date\">\n\t\t\t<br>\n\t\t\t<button\tclass=\"btn btn-primary\" onclick=\"addTask.addTaskClick()\">Add Task</button>\n\t\t";
    };
    AddTask.prototype.loadModule = function () {
        document.getElementById('addTask').innerHTML = this.generateHtml();
    };
    AddTask.prototype.addTaskClick = function () {
        var target = document.getElementById('task');
        var targetDetails = document.getElementById('details');
        var targetCategory = document.getElementById('category');
        var targetDueDate = document.getElementById('dueDate');
        var newTask = {
            task: target.value,
            details: targetDetails.value,
            category: targetCategory.value,
            dueDate: targetDueDate.value
        };
        this.addTask(newTask);
        target.value = "";
        targetDetails.value = "";
        targetCategory.value = "";
        targetDueDate.value = "";
    };
    AddTask.prototype.addTask = function (task) {
        var newTask = {
            task: task.task,
            details: task.details,
            category: task.category,
            dueDate: task.dueDate,
            isComplete: false
        };
        var parentDiv = document.getElementById('task').parentElement;
        if (task === "") {
            parentDiv.classList.add('has-error');
        }
        else {
            parentDiv.classList.remove('has-error');
            app.taskList.push(newTask);
            app.loadTasks();
        }
    };
    return AddTask;
}());
var addTask;
window.addEventListener('load', function () {
    addTask = new AddTask();
});
//# sourceMappingURL=addTask.js.map