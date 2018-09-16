var densityCanvas = document.getElementById("densityChart");

let incomePrices = [];
let incomeDates = [];

let expensePrices = [];
let expenseDates = [];

$.getJSON("/api/incomes", (data) => {
    for(let i = 0; i < data.length; i++) {
        incomePrices.push(data[i].amount);
        let date = new Date(data[i].create_date);
        let beginDate = date.toDateString();
        incomeDates.push(beginDate);
    }
    $.getJSON("/api/expenses", (d) => {
        for(let i = 0; i < d.length; i++) {
            expensePrices.push(d[i].amount);
            let sow = new Date(d[i].create_date);
            let nowDate = sow.toDateString();
            expenseDates.push(nowDate);
        }
        Chart.defaults.global.defaultFontFamily = "Lato";
        Chart.defaults.global.defaultFontSize = 18;

        var densityData = {
          label: 'Income',
          data: incomePrices,
          backgroundColor: 'rgba(0,128,0)',
          borderWidth: 0,
          yAxisID: "y-axis-income"
        };

        var gravityData = {
          label: 'Expense',
          data: expensePrices,
          backgroundColor: 'rgba(255,0,0)',
          borderWidth: 0,
          yAxisID: "y-axis-expense"
        };

        let realDate = () => {
            if (incomeDates.length > expenseDates.length) {
                return incomeDates;
            } else if (incomeDates.length < expenseDates.length) {
                return expenseDates;
            } else {
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
          type: 'bar',
          data: planetData,
          options: chartOptions
        });

    });
});