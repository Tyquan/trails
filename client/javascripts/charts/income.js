$.getJSON("/api/incomes", (data) => {
	let prices = [];
	let dates = [];
	let categories = [];
	for(let i = 0; i < data.length; i++) {
		prices.push(data[i].amount);
		let date = new Date(data[i].create_date);
    	let beginDate = date.toDateString();
		dates.push(beginDate);
		categories.push(data[i].category);
	}
	
	var chartData = {
		labels: categories,
		datasets: [{
			label: "Income",
			fill: false,
			lineTension: 0.1,
			backgroundColor: [
				`rgb(${Math.floor((Math.random() * 255) + 1)},${Math.floor((Math.random() * 255) + 1)},${Math.floor((Math.random() * 255) + 1)},0.4)`,
				`rgb(${Math.floor((Math.random() * 255) + 1)},${Math.floor((Math.random() * 255) + 1)},${Math.floor((Math.random() * 255) + 1)},0.4)`,
				`rgb(${Math.floor((Math.random() * 255) + 1)},${Math.floor((Math.random() * 255) + 1)},${Math.floor((Math.random() * 255) + 1)},0.4)`,
				`rgb(${Math.floor((Math.random() * 255) + 1)},${Math.floor((Math.random() * 255) + 1)},${Math.floor((Math.random() * 255) + 1)},0.4)`,
				`rgb(${Math.floor((Math.random() * 255) + 1)},${Math.floor((Math.random() * 255) + 1)},${Math.floor((Math.random() * 255) + 1)},0.4)`,
				`rgb(${Math.floor((Math.random() * 255) + 1)},${Math.floor((Math.random() * 255) + 1)},${Math.floor((Math.random() * 255) + 1)},0.4)`,
				`rgb(${Math.floor((Math.random() * 255) + 1)},${Math.floor((Math.random() * 255) + 1)},${Math.floor((Math.random() * 255) + 1)},0.4)`
			],
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

	var ctx = $("#income-chart");
	var barGraph = new Chart(ctx, {
		type: 'doughnut',
		data: chartData
	});
});