window.addEventListener("load", function () {
    console.log("Add posts works");
    $("form").submit(function (data) {
        var bodi = data.target[0].value;
        var sent = {
            body: bodi
        };
        $.post('/api/social/posts/', sent, function (datas) {
            console.log(datas);
        });
    });
});
//# sourceMappingURL=addpost.js.map