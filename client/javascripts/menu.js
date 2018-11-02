window.addEventListener('load', () => {
	let menu = $('#mainMenu');
	let menuHide = $('#menuHide');
	menu.click((e) => {
		e.preventDefault();
		// if (menuHide.style.display == "none") {
		// 	menuHide.style.display = "block";
		// }
		// if (menuHide.style.display == "block") {
		// 	menuHide.style.display = "none";
		// }
		menuHide.css("display", "none");
	});
});