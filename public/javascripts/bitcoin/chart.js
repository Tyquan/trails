var synth = window.speechSynthesis;
var utterThis;

class BitcoinChart {
	constructor(){
		this.name = "Bitcoin BarChart";
		if (localStorage.getItem('Weemaple-Speak-Data') == null) {
			this.getBitcoinData();
			localStorage.setItem('Weemaple-Speak-Data', "true");
		}
		console.log(localStorage.getItem('Weemaple-Speak-Data'));

	}
	generateHtml(data, index) {
		return `
			<div class="col" id="bitcoinChart">
				<div class="row">
					<div class="col-xs-12">
						<h3>${data.price}</h3>
						<hr>
						<p><b>${data.timestamp}</b></p>
					</div>
				</div>
			</div>
		`;
	}
	getBitcoinData(){
		let prices = [];
		$.getJSON("/bitcoin/mydata", (data) => {
			$.each(data, (i, field) => {
				prices.push(field);
			});
			if (prices.length == 0){
	            return 0;
	        } 
	        else if(prices.length == 1) {
	            return prices;
	        }else {
	            let sum = 0;
	            for (let i = 0; i < prices.length; i++) {
	                sum += prices[i].price;
	            }
	            sum = sum / prices.length;

	            let beginPrice = prices[0].price;
	            //let beginDate = prices[0].timestamp.toDateString();
	            let date = new Date(prices[0].timestamp);
	            let beginDate = date.toDateString();
	            let dateTwo = new Date(prices[prices.length -2].timestamp);
	            let oldDate = dateTwo.toDateString();
				let currentPrice = prices[prices.length - 1].price;
				let lastPrice = prices[prices.length - 2].price;
				//let currentDate = prices[prices.length - 1].timestamp.toDateString();
				let difference = currentPrice - beginPrice;
				let lastDifference = currentPrice - lastPrice

				utterThis = new SpeechSynthesisUtterance(`The Price of one bitcoin has changed since yesterday. Yesterday ${oldDate} the price was ${lastPrice} and today it is ${currentPrice} so far. That is a difference of ${lastDifference.toFixed(2)}`);
				synth.speak(utterThis);

				utterThis = new SpeechSynthesisUtterance(`The Starting Price for 1 Bit coin on ${beginDate} was ${beginPrice} dollars.`);
				synth.speak(utterThis);

				if (beginPrice < currentPrice) {
					utterThis = new SpeechSynthesisUtterance(`The Price for 1 Bit coin has risen over this time by ${difference.toFixed(2)}. Maybe you should buy some bitcoin`);
					synth.speak(utterThis);
				} else if (beginPrice == currentPrice) {
					utterThis = new SpeechSynthesisUtterance(`The starting price and todays prices are the same.  Maybe you should look into other investments`);
					synth.speak(utterThis);
				}
				else {
					utterThis = new SpeechSynthesisUtterance(`The Price for 1 Bit coin has declined over this time by ${difference.toFixed(2)}. Maybe you should look into other investments`);
					synth.speak(utterThis);
				}
	        }
		});
	}
	loadBitcoinData(){
		return "hi";
	}
}

let bit;
window.addEventListener('load', () => {
	bit = new BitcoinChart();
});