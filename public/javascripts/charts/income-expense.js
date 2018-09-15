// const incomes = $('#incomeAmount');
// const expenses = $('#expenseAmount');

// $.each(expenses, (index, value) => {
// 	console.log(`${index} : ${value}`);
// });
// console.log(`Incomes: ${incomes.length}`);

$.ajax({
	url: 'http://localhost:3000/api/incomes',
	success: (data) => {
		console.log(data);
	}
});