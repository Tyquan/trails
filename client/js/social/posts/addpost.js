window.addEventListener("load", function () {
    console.log("Add posts works");
    $("form").submit(function (data) {
        data.preventDefault();
        console.log(data.target);
        var bodi = data.target[0].value;
        var photo = data.target[1].value;
        var sent = {
            body: bodi,
            postImage: photo
        };
        console.log(sent);
    });
});
//# sourceMappingURL=addpost.js.map