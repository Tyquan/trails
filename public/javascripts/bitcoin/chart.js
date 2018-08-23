var synth = window.speechSynthesis;
var utterThis;

class BitcoinChart {
	constructor(){
		this.name = "Bitcoin BarChart";
		this.getBitcoinData();

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
		$.getJSON("http://localhost:3000/bitcoin/mydata", (data) => {
			$.each(data, (i, field) => {
				prices.push(field.price);
			});
			if (prices.length == 0){
	            return 0;
	        } 
	        else if(prices.length == 1) {
	            return prices;
	        }else {
	            let sum = 0;
	            for (let i = 0; i < prices.length; i++) {
	                sum += prices[i];
	            }
	            sum = sum / prices.length;

	            utterThis = new SpeechSynthesisUtterance(`The Average Price for 1 Bit coin between the date of August 21 2018 and today is ${sum} dollars`);
				synth.speak(utterThis);
				let beginPrice = prices[0];
				let currentPrice = prices[prices.length - 1];
				let difference = currentPrice - beginPrice;
				utterThis = new SpeechSynthesisUtterance(`The Starting Price for 1 Bit coin on August 21 2018 was ${beginPrice} dollars and today the price is ${currentPrice} dollars`);
				synth.speak(utterThis);

				if (beginPrice < currentPrice) {
					utterThis = new SpeechSynthesisUtterance(`The Price for 1 Bit coin has risen over this time by ${difference}. Maybe you should buy some bitcoin`);
					synth.speak(utterThis);
				} else if (beginPrice == currentPrice) {
					utterThis = new SpeechSynthesisUtterance(`The starting price and todays prices are the same.  Maybe you should look into other investments`);
					synth.speak(utterThis);
				}
				else {
					utterThis = new SpeechSynthesisUtterance(`The Price for 1 Bit coin has declined over this time by ${difference}. Maybe you should look into other investments`);
					synth.speak(utterThis);
				}
	        }
		});
		//console.log(prices.length);
	}
	loadBitcoinData(){
		return "hi";
	}
}

let bit;
window.addEventListener('load', () => {
	bit = new BitcoinChart();
});