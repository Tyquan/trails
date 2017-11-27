var synth = window.speechSynthesis;
var utterThis;

class App {
	constructor(){
		this.appName = 'T.R Interest Manager'; 
		this.dbName = "INTEREST";
		this.author = 'Tyquan Reddick';
		this.version = '1.0.0';
		this.taskList = JSON.parse(localStorage.getItem(this.dbName));
		if (!this.taskList) {
			utterThis = new SpeechSynthesisUtterance(`Welcome to ${this.appName} - ${this.version} created by ${this.author}. I  will Load a Pre-defined ${this.dbName} Database since none were found.`);
			synth.speak(utterThis);
			this.taskList = [
				{task: 'Study', isComplete: false, details: 'Study Math, and Science', category: 'School', dueDate: this.getTodaysDate()},
				{task: 'Go To Sleep', isComplete: false, details: 'Sleep for at least 6 hours', category: 'Home', dueDate: this.getTodaysDate()},
			];
			utterThis = new SpeechSynthesisUtterance(`. Predefined ${this.dbName} have been Initiated! There are ${this.taskList.length} of them waiting to be completed. I hope you enjoy.`);
			synth.speak(utterThis);
			//alert(`Welcome to ${this.appName} - ${this.version} created by ${this.author}.\nPredefined Tasks have been Initiated! I hope you enjoy.`);
		} else {
			//console.log(`Loading ${this.dbName} from the localStorage Database...`);
			utterThis = new SpeechSynthesisUtterance(`I have taken the liberty of Loading ${this.dbName} from the local Storage Database. There are ${this.taskList.length} of them waiting to be completed. I hope you enjoy.`);
			synth.speak(utterThis);
		}
	}
}

let app;
window.addEventListener("load", () => {
	app = new App();
});