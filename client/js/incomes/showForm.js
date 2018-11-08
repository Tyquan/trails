window.addEventListener('load', function () {
    var showBtn = document.getElementById('showBtn');
    var hideMe = document.getElementById('hideMe');
    hideMe.style.display = 'none';
    showBtn.addEventListener('click', function () {
        if (hideMe.style.display == 'none') {
            showBtn.innerHTML = "Hide Add Income Feature";
            hideMe.style.display = 'block';
        }
        else {
            hideMe.style.display = 'none';
            showBtn.innerHTML = "Show Add Income Feature";
        }
    });
});
//# sourceMappingURL=showForm.js.map