window.addEventListener("load", () => {
	$.getJSON("/api/social/posts/myposts", (datas: any[]) => {
		console.log(datas);
	});
});