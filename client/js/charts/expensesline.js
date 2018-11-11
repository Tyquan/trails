$.getJSON("/api/expenses", function (datas) {
    var prices = [];
    var dates = [];
    for (var i = 0; i < datas.length; i++) {
        prices.push(datas[i].amount);
        var date = new Date(datas[i].create_date);
        var beginDate = date.toDateString();
        dates.push(beginDate);
    }
    var chartData = {
        labels: dates,
        datasets: [{
                label: "Expenses",
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
    var ctx = $("#expenses-chart");
    var barGraph = new Chart(ctx, {
        type: 'line',
        data: chartData
    });
});
//# sourceMappingURL=expensesline.js.map