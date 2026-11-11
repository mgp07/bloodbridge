
document.addEventListener("DOMContentLoaded", function () {

    const API_URL = "http://localhost:5000/api/auth";

    const loginForm = document.getElementById("loginForm");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");
    const emailInput = document.getElementById("email");
    const forgotPassword = document.getElementById("forgotPassword");
    const loginMessage = document.getElementById("loginMessage");

    // DASHBOARD PATHS
    const dashboards = {
        donor: "donor-dashboard.html",
        patient: "patient-dashboard.html",
        hospital: "hospital-dashboard.html"
    };

    // SHOW / HIDE PASSWORD
    if (togglePassword) {
        togglePassword.addEventListener("click", function () {

            const eyeIcon = togglePassword.querySelector("i");

            if (passwordInput.type === "password") {
                passwordInput.type = "text";

                eyeIcon.classList.remove("fa-eye");
                eyeIcon.classList.add("fa-eye-slash");

                togglePassword.setAttribute("aria-label", "Hide password");
                togglePassword.setAttribute("aria-pressed", "true");

            } else {
                passwordInput.type = "password";

                eyeIcon.classList.remove("fa-eye-slash");
                eyeIcon.classList.add("fa-eye");

                togglePassword.setAttribute("aria-label", "Show password");
                togglePassword.setAttribute("aria-pressed", "false");
            }
        });
    }

    // DISPLAY MESSAGE
    function showMessage(message, color) {
        loginMessage.textContent = message;
        loginMessage.style.color = color;
    }

    // FORGOT PASSWORD
    if (forgotPassword) {
        forgotPassword.addEventListener("click", function () {

            const email = emailInput.value.trim();

            if (!email) {
                showMessage(
                    "Please enter your registered email address.",
                    "#d7192d"
                );
                emailInput.focus();
                return;
            }

            if (!emailInput.checkValidity()) {
                showMessage(
                    "Please enter a valid email address.",
                    "#d7192d"
                );
                emailInput.focus();
                return;
            }

            showMessage(
                "Password reset is not available yet. Please contact the administrator.",
                "#d7192d"
            );
        });
    }

    // LOGIN FORM
    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const role = document.getElementById("role").value;
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!role || !email || !password) {
            showMessage(
                "Please complete all required fields.",
                "#d7192d"
            );
            return;
        }

        if (!dashboards[role]) {
            showMessage("Please select a valid account type.", "#d7192d");
            return;
        }

        const submitButton = loginForm.querySelector(
            'button[type="submit"], input[type="submit"]'
        );

        const originalText = submitButton
            ? submitButton.textContent
            : "";

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Logging in...";
        }

        try {

            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    role,
                    email,
                    password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed.");
            }

            // Store authentication details
            sessionStorage.setItem("bloodbridgeToken", data.token);
            sessionStorage.setItem("bloodbridgeUser", JSON.stringify(data.user));
            sessionStorage.setItem("bloodbridgeRole", data.role);

            showMessage("Login successful! Redirecting...", "#16834a");

            // Redirect to the correct dashboard
            setTimeout(function () {
                window.location.href = dashboards[data.role];
            }, 1000);

        } catch (error) {

            console.error("Login error:", error);

            if (error instanceof TypeError) {
                showMessage(
                    "Cannot connect to BloodBridge server. Please try again.",
                    "#d7192d"
                );
            } else {
                showMessage(error.message, "#d7192d");
            }

        } finally {

            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        }

    });

});
