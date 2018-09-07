window.addEventListener('load', () => {
	let showBtn = document.getElementById('showBtn');
	let hideMe = document.getElementById('hideMe');
	hideMe.style.display = 'none';
	showBtn.addEventListener('click', () => {
		if (hideMe.style.display == 'none') {
			showBtn.innerHTML = "Hide Add Expense Feature";
			hideMe.style.display = 'block';
		} else {
			hideMe.style.display = 'none';
			showBtn.innerHTML = "Show Add Expense Feature";
		}
	});
});