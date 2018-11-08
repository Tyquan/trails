var synth = window.speechSynthesis;
var utterThis;
var App = (function () {
    function App() {
        this.appName = 'T.R Task Manager';
        this.dbName = "TASKS";
        this.author = 'Tyquan Reddick';
        this.version = '1.0.0';
        this.taskList = JSON.parse(localStorage.getItem(this.dbName));
        if (!this.taskList) {
            utterThis = new SpeechSynthesisUtterance("Hi, I'm Kevin. I'm a digital Robot here to help you manage your tasks. Welcome to " + this.appName + " - version " + this.version + " created by " + this.author + ". I  will Load a Pre-defined " + this.dbName + " Database since none were found.");
            synth.speak(utterThis);
            this.taskList = [
                { task: 'Study', isComplete: false, details: 'Study Math, and Science', category: 'School', dueDate: this.getTodaysDate() },
                { task: 'Go To Sleep', isComplete: false, details: 'Sleep for at least 6 hours', category: 'Home', dueDate: this.getTodaysDate() },
            ];
            utterThis = new SpeechSynthesisUtterance(". Predefined Tasks have been Initiated! There are " + this.taskList.length + " of them waiting to be completed.");
            synth.speak(utterThis);
        }
        else {
            utterThis = new SpeechSynthesisUtterance("There are " + this.taskList.length + " tasks waiting to be completed.");
            synth.speak(utterThis);
        }
        this.loadTasks();
        this.exposeOldTasks();
    }
    App.prototype.generateTaskHtml = function (task, index) {
        return "\n\t\t\t<div class=\"col\" id=\"tasker\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-xs-12\">\n\t\t\t\t\t\t<label><input id=\"toggleTaskStatus\" type=\"checkbox\" onchange=\"app.toggleTaskStatus(" + index + ")\" value=\"\" class=\"\" " + (task.isComplete ? 'checked' : '') + "> Task Complete?</label>\n\t\t\t\t\t\t<h3>" + task.task + "</h3>\n\t\t\t\t\t\t<hr>\n\t\t\t\t\t\t<p><b>" + task.category + "</b></p>\n\t\t\t\t\t\t<p>" + task.details + "</p>\n\t\t\t\t\t\t<p><small><i>Due Date:</i> " + task.dueDate + "</small></p>\n\t\t\t\t\t\t<div class=\"delete-icon-area\">\n\t\t\t\t\t\t\t<a class=\"\" href=\"/\" onClick=\"app.deleteTask(event, " + index + ")\">\n\t\t\t\t\t\t\t\t<i id=\"deleteTask\" data-id=\"" + index + "\" class=\"btn btn-outline-danger btn-lg btn-block\"> Delete</i>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t";
    };
    App.prototype.loadTasks = function () {
        var _this = this;
        var tasksHtml = this.taskList.reduce(function (html, task, index) { return html += _this.generateTaskHtml(task, index); }, '');
        document.getElementById('app').innerHTML = tasksHtml;
        localStorage.setItem(this.dbName, JSON.stringify(this.taskList));
    };
    App.prototype.toggleTaskStatus = function (index) {
        this.taskList[index].isComplete = !this.taskList[index].isComplete;
        this.loadTasks();
    };
    App.prototype.deleteTask = function (event, taskIndex) {
        event.preventDefault();
        this.taskList.splice(taskIndex, 1);
        this.loadTasks();
    };
    App.prototype.getTodaysDate = function () {
        var d = new Date();
        var today = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        return today;
    };
    App.prototype.exposeOldTasks = function () {
        var today = this.getTodaysDate();
        console.log(today);
        for (var i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].dueDate < today) {
                utterThis = new SpeechSynthesisUtterance(this.taskList[i].task + " Has Went Past It's Due Date. It was supposed to be completed by " + this.taskList[i].dueDate);
                synth.speak(utterThis);
            }
        }
    };
    return App;
}());
var app;
window.addEventListener("load", function () {
    app = new App();
});
//# sourceMappingURL=app.js.map