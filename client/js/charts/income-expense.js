$.getJSON("/api/incomes", function (data) {
    var densityCanvas = document.getElementById("densityChart");
    var incomePrices = [];
    var incomeDates = [];
    var expensePrices = [];
    var expenseDates = [];
    for (var i = 0; i < data.length; i++) {
        incomePrices.push(data[i].amount);
        var date = new Date(data[i].create_date);
        var beginDate = date.toDateString();
        incomeDates.push(beginDate);
    }
    $.getJSON("/api/expenses", function (d) {
        for (var i = 0; i < d.length; i++) {
            expensePrices.push(d[i].amount);
            var sow = new Date(d[i].create_date);
            var nowDate = sow.toDateString();
            expenseDates.push(nowDate);
        }
        var densityData = {
            label: 'Income',
            data: incomePrices,
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
            yAxisID: "y-axis-income"
        };
        var gravityData = {
            label: 'Expense',
            data: expensePrices,
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
            yAxisID: "y-axis-expense"
        };
        var realDate = function () {
            if (incomeDates.length > expenseDates.length) {
                return incomeDates;
            }
            else if (incomeDates.length < expenseDates.length) {
                return expenseDates;
            }
            else {
                return incomeDates;
            }
        };
        var planetData = {
            labels: expenseDates,
            datasets: [densityData, gravityData]
        };
        var chartOptions = {
            scales: {
                xAxes: [{
                        barPercentage: 1,
                        categoryPercentage: 0.6
                    }],
                yAxes: [{
                        id: "y-axis-income"
                    }, {
                        id: "y-axis-expense"
                    }]
            }
        };
        var barChart = new Chart(densityCanvas, {
            type: 'line',
            data: planetData,
            options: chartOptions
        });
    });
});
//# sourceMappingURL=income-expense.js.map