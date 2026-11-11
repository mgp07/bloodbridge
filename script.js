/* =========================================
   BLOODBRIDGE - JAVASCRIPT
========================================= */


/* =========================================
   1. SET TODAY'S DATE
========================================= */

const today = new Date();

const todayString =
    today.getFullYear() + "-" +
    String(today.getMonth() + 1).padStart(2, "0") + "-" +
    String(today.getDate()).padStart(2, "0");

const dobInput = document.getElementById("dob");
const lastDonationDate =
    document.getElementById("lastDonationDate");

if (dobInput) {
    dobInput.max = todayString;
}

if (lastDonationDate) {
    lastDonationDate.max = todayString;
}


/* =========================================
   2. OPEN FORMS
========================================= */

function showForm(formId) {

    closeForms();

    const selectedForm = document.getElementById(formId);

    if (selectedForm) {

        selectedForm.style.display = "block";

        selectedForm.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }

}


/* =========================================
   3. CLOSE FORMS
========================================= */

function closeForms() {

    const donorForm =
        document.getElementById("donorForm");

    const requestForm =
        document.getElementById("requestForm");

    if (donorForm) {
        donorForm.style.display = "none";
    }

    if (requestForm) {
        requestForm.style.display = "none";
    }

}


/* =========================================
   4. AUTOMATIC AGE CALCULATION
========================================= */

function calculateAge() {

    const dob = dobInput.value;

    const ageField =
        document.getElementById("calculatedAge");

    const ageMessage =
        document.getElementById("ageMessage");

    ageField.value = "";
    ageMessage.textContent = "";

    if (!dob) return;

    const birthDate = new Date(dob + "T00:00:00");

    const currentDate = new Date();

    if (birthDate > currentDate) {

        ageMessage.textContent =
            "Date of birth cannot be in the future.";

        return;

    }

    let age =
        currentDate.getFullYear() -
        birthDate.getFullYear();

    const monthDifference =
        currentDate.getMonth() -
        birthDate.getMonth();

    if (
        monthDifference < 0 ||
        (
            monthDifference === 0 &&
            currentDate.getDate() < birthDate.getDate()
        )
    ) {

        age--;

    }

    ageField.value = age;

    if (age < 18) {

        ageMessage.textContent =
            "❌ Donors must be at least 18 years old.";

    } else {

        ageMessage.textContent =
            "✅ Age requirement met. Medical eligibility must still be checked.";

    }

}

if (dobInput) {
    dobInput.addEventListener("change", calculateAge);
}


/* =========================================
   5. LAST DONATION DETAILS
========================================= */

const donationHistory =
    document.getElementById("donationHistory");

const lastDonationSection =
    document.getElementById("lastDonationSection");

if (donationHistory) {

    donationHistory.addEventListener("change", function () {

        const donationMessage =
            document.getElementById("donationMessage");

        donationMessage.textContent = "";

        if (this.value === "Yes") {

            lastDonationSection.classList.remove("hidden");

            lastDonationDate.required = true;

        } else {

            lastDonationSection.classList.add("hidden");

            lastDonationDate.required = false;

            lastDonationDate.value = "";

        }

    });

}


/* =========================================
   6. DONOR REGISTRATION
========================================= */

const donorRegistration =
    document.getElementById("donorRegistration");

if (donorRegistration) {

    donorRegistration.addEventListener("submit", function (event) {

        event.preventDefault();

        calculateAge();

        const age = Number(
            document.getElementById("calculatedAge").value
        );

        if (!dobInput.value || !Number.isFinite(age)) {
            return;
        }

        if (age < 18) {
            return;
        }

        if (
            donationHistory.value === "Yes" &&
            !lastDonationDate.value
        ) {

            document.getElementById("donationMessage")
                .textContent =
                "Please enter your last donation date.";

            return;

        }

        if (
            lastDonationDate.value &&
            lastDonationDate.value > todayString
        ) {

            document.getElementById("donationMessage")
                .textContent =
                "Donation date cannot be in the future.";

            return;

        }

        const donor = Object.fromEntries(
            new FormData(this).entries()
        );

        if (donor.donationHistory === "Never donated") {

            donor.lastDonationDate = "";

        }

        const donors = JSON.parse(
            localStorage.getItem("bloodbridgeDonors") || "[]"
        );

        donors.push(donor);

        localStorage.setItem(
            "bloodbridgeDonors",
            JSON.stringify(donors)
        );

        document.getElementById("donorMessage")
            .textContent =
            "❤️ Donor registration saved successfully!";

        this.reset();

        lastDonationSection.classList.add("hidden");

        lastDonationDate.required = false;

        document.getElementById("calculatedAge").value = "";

        document.getElementById("ageMessage").textContent = "";

        document.getElementById("donationMessage").textContent = "";

    });

}


/* =========================================
   7. BLOOD REQUEST FORM
========================================= */

const bloodRequest =
    document.getElementById("bloodRequest");

if (bloodRequest) {

    bloodRequest.addEventListener("submit", function (event) {

        event.preventDefault();

        const request = Object.fromEntries(
            new FormData(this).entries()
        );

        const requests = JSON.parse(
            localStorage.getItem("bloodbridgeRequests") || "[]"
        );

        requests.push(request);

        localStorage.setItem(
            "bloodbridgeRequests",
            JSON.stringify(requests)
        );

        document.getElementById("requestMessage")
            .textContent =
            "❤️ Blood request saved successfully!";

        this.reset();

    });

}


/* =========================================
   8. NAVIGATION ACTIVE EFFECT
========================================= */

const navigationLinks =
    document.querySelectorAll(".navigation a");

navigationLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navigationLinks.forEach(function (item) {

            item.classList.remove("active");

        });

        this.classList.add("active");

    });

});


/* =========================================
   9. WELCOME MESSAGE
========================================= */

console.log(
    "❤️ Welcome to BloodBridge!"
);

console.log(
    "Connecting Donors. Supporting Patients. Saving Lives."
);


/* =========================================
   END OF JAVASCRIPT
========================================= */
// Open donor registration when redirected from About page
window.addEventListener("DOMContentLoaded", function () {

    const params = new URLSearchParams(window.location.search);

    const formToOpen = params.get("open");

    if (formToOpen === "donorForm") {
        showForm("donorForm");

        // Remove the query parameter after opening
        window.history.replaceState({}, document.title, "index.html");
    }

});