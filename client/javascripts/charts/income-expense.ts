$.getJSON("/api/incomes", (data: any[]) => {

  let densityCanvas: any = document.getElementById("densityChart");

  let incomePrices: number[] = [];
  let incomeDates: string[] = [];

  let expensePrices: number[] = [];
  let expenseDates: string[] = [];

  for(let i: number = 0; i < data.length; i++) {
      incomePrices.push(data[i].amount);
      let date = new Date(data[i].create_date);
      let beginDate = date.toDateString();
      incomeDates.push(beginDate);
  }
  $.getJSON("/api/expenses", (d: any[]) => {
      for(let i = 0; i < d.length; i++) {
          expensePrices.push(d[i].amount);
          let sow = new Date(d[i].create_date);
          let nowDate = sow.toDateString();
          expenseDates.push(nowDate);
      }

      var densityData: object = {
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

      var gravityData: object = {
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

      let realDate = () => {
          if (incomeDates.length > expenseDates.length) {
              return incomeDates;
          } else if (incomeDates.length < expenseDates.length) {
              return expenseDates;
          } else {
              return incomeDates;
          }
      };

      var planetData: object = {
        labels: expenseDates,
        datasets: [densityData, gravityData]
      };

      var chartOptions: object = {
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