window.addEventListener("load", function () {
    $.getJSON("/api/social/posts/myposts", function (datas) {
        console.log(datas);
        $.each(datas, function (index, value) {
            console.log(value);
            $("#myposts").append("<div class=\"col-sm-12\"><div id=\"block-profile\"><div class=\"row\"><div class=\"col-sm-2\"><img class=\"img-fluid\" src=\"" + value.imageUrl + "\" /></div><div class=\"col-sm-10\"><h4>" + value.username + "</h4></div></div><hr><p>" + value.body + "</p><p><small>" + value.create_date + "</small></p></div></div>");
        });
    });
});
//# sourceMappingURL=myposts.js.map