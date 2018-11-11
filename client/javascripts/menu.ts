window.addEventListener('load', () => {
	let menu = $('#mainMenu');
	let menuHide = $('#menuHide');
	menu.click((e: any) => {
		e.preventDefault();
		menuHide.css("display", "none");
	});
});