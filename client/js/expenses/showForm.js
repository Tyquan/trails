window.addEventListener('load', function () {
    var showBtn = document.getElementById('showBtn');
    var hideMe = document.getElementById('hideMe');
    hideMe.style.display = 'none';
    showBtn.addEventListener('click', function () {
        if (hideMe.style.display == 'none') {
            showBtn.innerHTML = "Hide Add Expense Feature";
            hideMe.style.display = 'block';
        }
        else {
            hideMe.style.display = 'none';
            showBtn.innerHTML = "Show Add Expense Feature";
        }
    });
    var due_date = document.getElementById('due_date');
});
//# sourceMappingURL=showForm.js.map