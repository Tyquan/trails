var synth = window.speechSynthesis;
var utterThis;

class Interest {
	constructor(){
		this.appName = 'Trails Interest Manager'; 
		this.dbName = "INTERESTS";
		this.author = 'Tyquan Reddick';
		this.version = '1.0.0';
		this.interstList = JSON.parse(localStorage.getItem(this.dbName));
		if (!this.interstList) {
			utterThis = new SpeechSynthesisUtterance(`Welcome to ${this.appName} - ${this.version} created by ${this.author}. I  will Load a Pre-defined ${this.dbName} Database since none were found.`);
			synth.speak(utterThis);
			this.interstList = [
				{title: 'Computers', reason: "Learning", creation_date: this.getTodaysDate()},
				{title: 'Music', reason: "Enjoyment", creation_date: this.getTodaysDate()},
			];
			utterThis = new SpeechSynthesisUtterance(`. Predefined ${this.dbName} have been Initiated! There are ${this.interstList.length} of them waiting to be completed. I hope you enjoy.`);
			synth.speak(utterThis);
		} else {
			utterThis = new SpeechSynthesisUtterance(`I have taken the liberty of Loading ${this.dbName} from the local Storage Database. There are ${this.interstList.length} of them waiting to be completed. I hope you enjoy.`);
			synth.speak(utterThis);
		}
		this.loadIntersts();
	}

	// Html Setup (This can be changed)
	generateinterstHtml(interst, index) {
		return `
			<div class="col" id="interster">
				<div class="row">
					<div class="col-xs-12">
						<label><input id="toggleinterstStatus" type="checkbox" onchange="interst.toggleinterstStatus(${index})" value="" class="" ${interst.isComplete?'checked':''}> interst Complete?</label>
						<h3>${interst.interst}</h3>
						<hr>
						<p><b>${interst.category}</b></p>
						<p>${interst.details}</p>
						<p><small><i>Due Date:</i> ${interst.dueDate}</small></p>
						<div class="delete-icon-area">
							<a class="" href="/" onClick="interst.deleteinterst(event, ${index})">
								<i id="deleteinterst" data-id="${index}" class="delete-icon glyphicon glyphicon-trash"> Delete</i>
							</a>
						</div>
					</div>
				</div>
			</div>
		`;
	}

	// Load all interests in the database
	loadInterests() {
		let interestsHtml =	this.interstList.reduce((html, interst, index) => html += this.generateinterstHtml(interst, index), '');
		document.getElementById('interst').innerHTML =	interstsHtml;

		// added for local storage persistance
		localStorage.setItem(this.dbName, JSON.stringify(this.interstList));
	}

	// Delete a interst from the database
	deleteinterst(event, interstIndex){
		event.preventDefault();
		this.interstList.splice(interstIndex, 1);
		this.loadintersts();
	}

	getTodaysDate () {
		let d = new Date();
		let today = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
		return today;
	}

}

let interst;
window.addEventListener("load", () => {
	interst = new Interest();
});