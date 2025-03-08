// ✅ Handle Signup Request
document.getElementById("signupForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent page refresh

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
            alert("User already exists!"); // ✅ Show alert if user exists
        } else if (response.status === 201) {
            alert("Signup successful! Redirecting to login...");
            window.location.href = "login.html"; // Redirect to login page
        } else {
            alert("Something went wrong. Please try again.");
        }

        document.getElementById("signupMessage").innerText = data.message; // Show message
    } catch (error) {
        console.error("Error:", error);
        alert("Server error. Please try again later.");
    }
});


// ✅ Handle Login Request
document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    document.getElementById("message").innerText = data.message;
});