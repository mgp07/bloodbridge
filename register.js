
document.addEventListener("DOMContentLoaded", function () {

    // ====================================
    // GET HTML ELEMENTS
    // ====================================

    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");

    const togglePassword = document.getElementById("togglePassword");
    const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

    const registerForm = document.getElementById("registerForm");
    const roleSelect = document.getElementById("role");
    const roleFields = document.getElementById("roleFields");
    const registerMessage = document.getElementById("registerMessage");

    const fullNameInput = document.getElementById("fullName");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const termsInput = document.getElementById("terms");

    // Backend URL
    const API_URL = "http://localhost:5000/api/auth";


    // ====================================
    // PASSWORD VISIBILITY
    // ====================================

    function setupPasswordToggle(input, button) {

        if (!input || !button) return;

        button.addEventListener("click", function () {

            const icon = button.querySelector("i");

            if (input.type === "password") {

                input.type = "text";

                if (icon) {
                    icon.classList.replace("fa-eye", "fa-eye-slash");
                }

                button.setAttribute("aria-label", "Hide password");

            } else {

                input.type = "password";

                if (icon) {
                    icon.classList.replace("fa-eye-slash", "fa-eye");
                }

                button.setAttribute("aria-label", "Show password");

            }

        });

    }

    setupPasswordToggle(passwordInput, togglePassword);
    setupPasswordToggle(confirmPasswordInput, toggleConfirmPassword);


    // ====================================
    // DYNAMIC ROLE FIELDS
    // ====================================

    function showRoleFields(role) {

        roleFields.innerHTML = "";

        let fields = "";

        if (role === "donor" || role === "patient") {

            fields = `
                <h3 class="role-fields-heading">
                    ${role === "donor" ? "Donor Details" : "Patient Details"}
                </h3>

                <div class="form-group">
                    <label for="age">Age</label>
                    <div class="input-box">
                        <i class="fa-solid fa-calendar"></i>
                        <input type="number" id="age" name="age"
                            min="18" max="100"
                            placeholder="Enter your age" required>
                    </div>
                </div>

                <div class="form-group">
                    <label for="bloodGroup">Blood Group</label>
                    <div class="input-box">
                        <i class="fa-solid fa-droplet"></i>
                        <select id="bloodGroup" name="bloodGroup" required>
                            <option value="">Select blood group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label for="address">Address</label>
                    <div class="input-box">
                        <i class="fa-solid fa-location-dot"></i>
                        <input type="text" id="address" name="address"
                            placeholder="Enter your full address" required>
                    </div>
                </div>
            `;

        } else if (role === "hospital") {

            fields = `
                <h3 class="role-fields-heading">Hospital Details</h3>

                <div class="form-group">
                    <label for="hospitalName">Hospital Name</label>
                    <div class="input-box">
                        <i class="fa-solid fa-hospital"></i>
                        <input type="text" id="hospitalName"
                            name="hospitalName"
                            placeholder="Enter hospital name" required>
                    </div>
                </div>

                <div class="form-group">
                    <label for="registrationNumber">
                        Hospital Registration Number
                    </label>
                    <div class="input-box">
                        <i class="fa-solid fa-id-card"></i>
                        <input type="text" id="registrationNumber"
                            name="registrationNumber"
                            placeholder="Enter registration number" required>
                    </div>
                </div>

                <div class="form-group">
                    <label for="address">Hospital Address</label>
                    <div class="input-box">
                        <i class="fa-solid fa-location-dot"></i>
                        <input type="text" id="address" name="address"
                            placeholder="Enter hospital address" required>
                    </div>
                </div>

                <div class="form-group">
                    <label for="city">City</label>
                    <div class="input-box">
                        <i class="fa-solid fa-city"></i>
                        <input type="text" id="city" name="city"
                            placeholder="Enter hospital city" required>
                    </div>
                </div>
            `;

        } else {

            roleFields.innerHTML = `
                <p class="role-hint">
                    Select an account type to see additional details.
                </p>
            `;

            return;
        }

        roleFields.innerHTML = fields;

    }


    // Account type selection
    roleSelect.addEventListener("change", function () {
        showRoleFields(this.value);
    });


    // ====================================
    // REGISTRATION FORM SUBMISSION
    // ====================================

    registerForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        registerMessage.style.color = "#d7192d";
        registerMessage.textContent = "";

        const role = roleSelect.value;

        const fullName = fullNameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();

        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;


        // Check account type
        if (!role) {
            registerMessage.textContent =
                "Please select an account type.";
            return;
        }


        // Password validation
        if (password.length < 8) {
            registerMessage.textContent =
                "Password must contain at least 8 characters.";

            passwordInput.focus();
            return;
        }

        if (password !== confirmPassword) {
            registerMessage.textContent =
                "Passwords do not match.";

            confirmPasswordInput.focus();
            return;
        }


        // Phone validation
        if (!/^[0-9]{10}$/.test(phone)) {
            registerMessage.textContent =
                "Please enter a valid 10-digit phone number.";

            phoneInput.focus();
            return;
        }


        // Terms validation
        if (!termsInput.checked) {
            registerMessage.textContent =
                "Please accept the Terms and Conditions.";
            return;
        }


        // ====================================
        // PREPARE REGISTRATION DATA
        // ====================================

        let endpoint = "";
        let userData = {};


        if (role === "donor") {

            const age = document.getElementById("age").value;
            const bloodGroup = document.getElementById("bloodGroup").value;
            const address = document.getElementById("address").value.trim();

            if (Number(age) < 18 || Number(age) > 100) {
                registerMessage.textContent =
                    "Please enter a valid age between 18 and 100.";
                return;
            }

            endpoint = "/register/donor";

            userData = {
                fullName,
                email,
                password,
                phone,
                age: Number(age),
                bloodGroup,
                address
            };


        } else if (role === "patient") {

            const age = document.getElementById("age").value;
            const bloodGroup = document.getElementById("bloodGroup").value;
            const address = document.getElementById("address").value.trim();

            if (Number(age) < 18 || Number(age) > 100) {
                registerMessage.textContent =
                    "Please enter a valid age between 18 and 100.";
                return;
            }

            endpoint = "/register/patient";

            userData = {
                fullName,
                email,
                password,
                phone,
                age: Number(age),
                bloodGroup,
                address
            };


        } else if (role === "hospital") {

            const hospitalName =
                document.getElementById("hospitalName").value.trim();

            const registrationNumber =
                document.getElementById("registrationNumber").value.trim();

            const address =
                document.getElementById("address").value.trim();

            const city =
                document.getElementById("city").value.trim();

            endpoint = "/register/hospital";

            userData = {
                hospitalName,
                email,
                password,
                phone,
                registrationNumber,
                address,
                city
            };

        } else {

            registerMessage.textContent = "Invalid account type.";
            return;

        }


        // ====================================
        // SEND DATA TO BACKEND
        // ====================================

        const submitButton = registerForm.querySelector(
            'button[type="submit"]'
        );

        submitButton.disabled = true;
        submitButton.textContent = "Creating Account...";


        try {

            const response = await fetch(API_URL + endpoint, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(userData)

            });


            const result = await response.json();


            if (!response.ok) {
                throw new Error(
                    result.message || "Registration failed."
                );
            }


            // ====================================
            // REGISTRATION SUCCESS
            // ====================================

            registerMessage.style.color = "#16834a";

            registerMessage.textContent =
                result.message || "Account created successfully!";


            // Clear registration form
            registerForm.reset();

            roleFields.innerHTML = `
                <p class="role-hint">
                    Select an account type to see additional details.
                </p>
            `;


            // Redirect to login page
            // User will enter credentials there
            // Login logic will redirect to the correct dashboard

            setTimeout(function () {

                window.location.href = "login.html";

            }, 2000);


        } catch (error) {

            console.error("Registration error:", error);

            registerMessage.style.color = "#d7192d";

            if (error instanceof TypeError) {

                registerMessage.textContent =
                    "Cannot connect to BloodBridge server. Please check whether the backend is running.";

            } else {

                registerMessage.textContent = error.message;

            }

        } finally {

            submitButton.disabled = false;

            submitButton.innerHTML =
                'Create Account <i class="fa-solid fa-arrow-right"></i>';

        }

    });

});
