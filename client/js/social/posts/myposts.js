window.addEventListener("load", function () {
    $.getJSON("/api/social/posts/myposts", function (datas) {
        console.log(datas);
    });
});
//# sourceMappingURL=myposts.js.map