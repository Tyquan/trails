class AddTask {
	constructor() {
		this.name = "addTask";
		this.loadModule();
	}

	generateHtml() {
		return `
			<label>Task Title</label>
			<input type="text" id="task" class="form-control" required />
			<br>
			<label>Task Category</label>
			<input type="text" id="category" class="form-control" required />
			<br>
			<label>Task Details</label>
			<textarea class="form-control" id="details"></textarea>
			<br>
			<label>Date Due</label>
			<input class="form-control" id="dueDate" type="date">
			<br>
			<button	class="btn btn-primary" onclick="addTask.addTaskClick()">Add Task</button>
		`;
	}

	loadModule(){
		document.getElementById('addTask').innerHTML = this.generateHtml();
	}

	addTaskClick() {
		let target = document.getElementById('task');
		let targetDetails = document.getElementById('details');
		let targetCategory = document.getElementById('category');
		let targetDueDate = document.getElementById('dueDate');
		let newTask = {
			task: target.value,
			details: targetDetails.value,
			category: targetCategory.value,
			dueDate: targetDueDate.value
		}
		this.addTask(newTask);
		target.value = "";
		targetDetails.value = "";
		targetCategory.value = "";
		targetDueDate.value = "";
	}

	addTask(task) {
		let newTask = {
			task: task.task,
			details: task.details,
			category: task.category,
			dueDate: task.dueDate,
			isComplete: false
		};
		let parentDiv = document.getElementById('task').parentElement;
		if (task === "") {
			parentDiv.classList.add('has-error');
		} else {
			parentDiv.classList.remove('has-error');
			app.taskList.push(newTask);
			app.loadTasks();
		}
	}
}

let addTask;
window.addEventListener('load', () => {
	addTask = new AddTask();
});