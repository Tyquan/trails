window.addEventListener('load', function () {
    var menu = $('#mainMenu');
    var menuHide = $('#menuHide');
    menu.click(function (e) {
        e.preventDefault();
        menuHide.css("display", "none");
    });
});
//# sourceMappingURL=menu.js.map