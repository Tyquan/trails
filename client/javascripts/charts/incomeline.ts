$.getJSON("/api/incomes", (data: any[]) => {
	let prices: number[] = [];
	let dates: string[] = [];
	let categories: any[] = [];
	for(let i = 0; i < data.length; i++) {
		prices.push(data[i].amount);
		let date = new Date(data[i].create_date);
    let beginDate = date.toDateString();
		dates.push(beginDate);
		categories.push(data[i].category);
	}
	
	var chartData: object = {
		labels: dates,
		datasets: [{
			label: "Income",
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

	var ctx: any = $("#incomeLine-chart");
	var barGraph = new Chart(ctx, {
		type: 'line',
		data: chartData
	});
});