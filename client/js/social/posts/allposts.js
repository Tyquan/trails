window.addEventListener("load", function () {
    $.getJSON("/api/social/posts/allposts", function (datas) {
        console.log(datas);
        $.each(datas, function (index, value) {
            console.log(value);
            $("#allposts").append("<div class=\"col-sm-12\"><div id=\"block-profile\"><h4>" + value.username + "</h4><hr><p>" + value.body + "</p><p><small>" + value.create_date + "</small></p></div></div>");
        });
    });
});
//# sourceMappingURL=allposts.js.map