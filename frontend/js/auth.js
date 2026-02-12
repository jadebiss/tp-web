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


// ===== LOGIN =====
document.getElementById("loginForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    alert(data.message);

});


document.getElementById("registerForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const confirm = document.getElementById("registerPasswordConfirm").value;

    if (password !== confirm) {
        alert("Les mots de passe ne correspondent pas");
        return;
    }

    const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    alert(data.message);

});

