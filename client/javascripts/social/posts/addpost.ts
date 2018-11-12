window.addEventListener("load", () => {
	console.log("Add posts works");
	$("form").submit((data) => {
		data.preventDefault();
		console.log(data.target);
		let bodi: string = data.target[0].value;
		let photo: any = data.target[1].value;
		let sent = {
			body: bodi,
			postImage: photo
		};
		console.log(sent);
		// $.post('/api/social/posts/', sent , (datas) => {
		// 	console.log(datas);
		// });
	});
});