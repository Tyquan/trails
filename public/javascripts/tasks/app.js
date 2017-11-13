var synth = window.speechSynthesis;
var utterThis;

class App {
	constructor () {
		this.appName = 'T.R Task Manager'; 
		this.dbName = "TASKS";
		this.author = 'Tyquan Reddick';
		this.version = '1.0.0';
		this.taskList = JSON.parse(localStorage.getItem(this.dbName));
		if (!this.taskList) {
			utterThis = new SpeechSynthesisUtterance(`Hi, I'm Kevin. I'm a sentient digital Robot here to help you manage your tasks. Welcome to ${this.appName} - ${this.version} created by ${this.author}. I  will Load a Pre-defined ${this.dbName} Database since none were found.`);
			synth.speak(utterThis);
			this.taskList = [
				{task: 'Study', isComplete: false, details: 'Study Math, and Science', category: 'School', dueDate: this.getTodaysDate()},
				{task: 'Go To Sleep', isComplete: false, details: 'Sleep for at least 6 hours', category: 'Home', dueDate: this.getTodaysDate()},
			];
			utterThis = new SpeechSynthesisUtterance(`. Predefined Tasks have been Initiated! There are ${taskList.length} of them waiting to be completed. I hope you enjoy.`);
			synth.speak(utterThis);
			//alert(`Welcome to ${this.appName} - ${this.version} created by ${this.author}.\nPredefined Tasks have been Initiated! I hope you enjoy.`);
		} else {
			//console.log(`Loading ${this.dbName} from the localStorage Database...`);
			utterThis = new SpeechSynthesisUtterance(`Loading ${this.dbName} from the local Storage Database. There are ${this.taskList.length} of them waiting to be completed. I hope you enjoy.`);
			synth.speak(utterThis);
		}
		this.loadTasks();
		this.exposeOldTasks();
	}

	// Html Setup (This can be changed)
	generateTaskHtml(task, index) {
		return `
			<div class="col" id="tasker">
				<div class="row">
					<div class="col-xs-12">
						<label><input id="toggleTaskStatus" type="checkbox" onchange="app.toggleTaskStatus(${index})" value="" class="" ${task.isComplete?'checked':''}> Task Complete?</label>
						<h3>${task.task}</h3>
						<hr>
						<p><b>${task.category}</b></p>
						<p>${task.details}</p>
						<p><small><i>Due Date:</i> ${task.dueDate}</small></p>
						<div class="delete-icon-area">
							<a class="" href="/" onClick="app.deleteTask(event, ${index})">
								<i id="deleteTask" data-id="${index}" class="delete-icon glyphicon glyphicon-trash"> Delete</i>
							</a>
						</div>
					</div>
				</div>
			</div>
		`;
	}

	// Load all tasks in the database
	loadTasks() {
		let tasksHtml =	this.taskList.reduce((html, task, index) => html += this.generateTaskHtml(task, index), '');
		document.getElementById('app').innerHTML =	tasksHtml;

		// added for local storage persistance
		localStorage.setItem(this.dbName, JSON.stringify(this.taskList));
	}

	// Toggle the complete checkbox successfully
	toggleTaskStatus(index) {
		this.taskList[index].isComplete = !this.taskList[index].isComplete;
		this.loadTasks();
	}

	// Delete a task from the database
	deleteTask(event, taskIndex){
		event.preventDefault();
		this.taskList.splice(taskIndex, 1);
		this.loadTasks();
	}

	getTodaysDate () {
		let d = new Date();
		let today = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
		return today;
	}

	exposeOldTasks(){
		let today = this.getTodaysDate();
		for (let i = 0; i < this.taskList.length;  i++) {
			if (this.taskList[i].dueDate < today) {
				alert(`Task (${this.taskList[i].task}) Has Went Past It's Due Date.`);
			}
		}
	}
}

let app;
window.addEventListener("load", () => {
	app = new App();
});