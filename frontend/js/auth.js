const toggleButtons = document.querySelectorAll(".toggle-btn");
const forms = document.querySelectorAll(".form");
const message = document.getElementById("message");


toggleButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        toggleButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        forms.forEach(f => f.classList.remove("active"));

        const tab = btn.dataset.tab;

        document.getElementById(tab + "Form").classList.add("active");
    });
});

