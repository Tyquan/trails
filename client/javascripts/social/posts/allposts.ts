window.addEventListener("load", () => {
	$.getJSON("/api/social/posts/allposts", (datas: any[]) => {
		console.log(datas);
		$.each(datas, (index, value) => {
			console.log(value);
			$("#allposts").append(`<div class="col-sm-12"><div id="block-profile"><h4>${value.username}</h4><hr><p>${value.body}</p><p><small>${value.create_date}</small></p></div></div>`);
		});

		
	});
});