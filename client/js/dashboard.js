window.addEventListener("load", function () {
    var result = document.getElementById('swimResult');
    if (result.value < 0) {
        result.style.color = "red";
    }
    if (result.value > 0) {
        result.style.color = "green";
    }
    else {
        result.style.color = "black";
    }
});
//# sourceMappingURL=dashboard.js.map