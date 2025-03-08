document.addEventListener("DOMContentLoaded", function() {
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");
    const loginEmailInput = document.getElementById("loginEmail");
    const emailStatus = document.getElementById("emailStatus");

    if (signupForm) {
        signupForm.addEventListener("submit", async function(event) {
            event.preventDefault();
            const email = document.getElementById("signupEmail").value;
            const password = document.getElementById("signupPassword").value;

            try {
                const response = await fetch("http://localhost:5000/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();
                if (response.status === 400) {
                    alert("User already exists!");
                } else if (response.status === 201) {
                    alert("Signup successful! Redirecting to login...");
                    window.location.href = "login.html";
                } else {
                    alert("Something went wrong. Please try again.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Server error. Please try again later.");
            }
        });
    }

    if (loginEmailInput) {
        loginEmailInput.addEventListener("input", async function() {
            const email = this.value.trim();

            if (email.length > 0) {
                try {
                    const response = await fetch("http://localhost:5000/check-email", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email })
                    });

                    const data = await response.json();
                    if (response.ok) {
                        emailStatus.innerText = "✅ Email exists. You can log in.";
                        emailStatus.style.color = "green";
                    } else {
                        emailStatus.innerText = "❌ Email not found. Please sign up first.";
                        emailStatus.style.color = "red";
                    }
                } catch (error) {
                    console.error("Error:", error);
                }
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", async function(event) {
            event.preventDefault();
            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            try {
                const response = await fetch("http://localhost:5000/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();
                if (response.ok) {
                    alert("Login successful! Redirecting...");
                    window.location.href = "index.html";
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Server error. Please try again later.");
            }
        });
    }
});
