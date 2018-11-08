$.getJSON("/api/incomes", function (data) {
    var prices = [];
    var dates = [];
    var categories = [];
    for (var i = 0; i < data.length; i++) {
        prices.push(data[i].amount);
        var date = new Date(data[i].create_date);
        var beginDate = date.toDateString();
        dates.push(beginDate);
        categories.push(data[i].category);
    }
    var chartData = {
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
    var ctx = $("#incomeLine-chart");
    var barGraph = new Chart(ctx, {
        type: 'line',
        data: chartData
    });
});
//# sourceMappingURL=incomeline.js.map