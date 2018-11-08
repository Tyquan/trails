window.addEventListener('load', () => {
	let menu = $('#mainMenu');
	let menuHide = $('#menuHide');
	menu.click((e) => {
		e.preventDefault();
		menuHide.css("display", "none");
	});
});