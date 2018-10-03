window.addEventListener('load', () => {
	let signout = document.getElementById('signout');
	signout.addEventListener('click', () => {
		localStorage.setItem('Weemaple-Speak-Data', "false");
	});
});