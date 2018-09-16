let prices = [];
let dates = [];
$.getJSON("/bitcoin/mydata", (data) => {
	// $.each(data, (i, field) => {
	// 	//prices.push(field.price);
	// 	prices.push(field);
	// });
	// let date = new Date(prices[0].timestamp);
 //    let beginDate = date.toDateString();
	for(let i = 0; i < data.length; i++) {
		prices.push(data[i].price);
		let date = new Date(data[i].timestamp);
    	let beginDate = date.toDateString();
		dates.push(beginDate);
	}
	
	var chartData = {
		labels: dates,
		datasets: [{
			label: "Bitcoin Price",
			fill: false,
			lineTension: 0.1,
			backgroundColor: "rgb(75,192,192,0.4)",
			borderColor: "rgb(75,192,192,1)",
			corderCapStyle: "butt",
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: "miter",
			pointBorderColor: "rgb(75,192,192,1)",
			pointBackgroundColor: "#fff",
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: "rgb(75,192,192,1)",
			pointHoverBorderColor: "rgb(220,220,220,1)",
			pointHoverBorderWidth: 2,
			pointRadius: 1,
			pointHitRadius: 10,
			data: prices
		}]
	};

	var ctx = $("#bitcoin-chart");
	var barGraph = new Chart(ctx, {
		type: 'line',
		data: chartData
	});
});