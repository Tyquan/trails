window.addEventListener("load", () => {
	console.log("Add posts works");
	$("form").submit((data) => {
		//data.preventDefault();
		let bodi: string = data.target[0].value;
		let sent = {
			body: bodi
		}
		$.post('/api/social/posts/', sent , (datas) => {
			console.log(datas);
		});
	});
});