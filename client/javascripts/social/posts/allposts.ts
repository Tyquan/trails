window.addEventListener("load", () => {
	$.getJSON("/api/social/posts/allposts", (datas: any[]) => {
		console.log(datas);
		$.each(datas, (index, value) => {
			console.log(value);
			$("#allposts").append(`<div class="col-sm-12"><div id="block-profile"><div class="row"><div class="col-sm-2"><img class="img-fluid" src="${value.imageUrl}" /></div><div class="col-sm-10"><h4>${value.username}</h4></div></div><hr><p>${value.body}</p><p><small>${value.create_date}</small></p></div></div>`);
		});
	});
});