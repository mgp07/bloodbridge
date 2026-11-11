
document.addEventListener("DOMContentLoaded", function () {

    // =================================
    // GET HTML ELEMENTS
    // =================================

    const availabilityToggle = document.getElementById("availabilityToggle");
    const availabilityStatus = document.getElementById("availabilityStatus");

    const logoutButton = document.getElementById("logoutButton");
    const notificationButton = document.getElementById("notificationButton");

    const headerName = document.getElementById("headerName");
    const welcomeName = document.getElementById("welcomeName");

    const profileName = document.getElementById("profileName");
    const profileEmail = document.getElementById("profileEmail");
    const profilePhone = document.getElementById("profilePhone");
    const profileBloodGroup = document.getElementById("profileBloodGroup");
    const profileCity = document.getElementById("profileCity");

    const bloodGroup = document.getElementById("bloodGroup");


    // =================================
    // DEMO DONOR INFORMATION
    // =================================

    // Temporary sample information.
    // Real user data will come from MongoDB later.

    const donor = {
        fullName: "Demo Donor",
        email: "donor@example.com",
        phone: "9876543210",
        bloodGroup: "O+",
        city: "Mangalore",
        totalDonations: 0,
        livesImpacted: 0,
        lastDonation: "Not yet"
    };


    // =================================
    // DISPLAY DONOR INFORMATION
    // =================================

    headerName.textContent = donor.fullName;
    welcomeName.textContent = donor.fullName;

    profileName.textContent = donor.fullName;
    profileEmail.textContent = donor.email;
    profilePhone.textContent = donor.phone;
    profileBloodGroup.textContent = donor.bloodGroup;
    profileCity.textContent = donor.city;

    bloodGroup.textContent = donor.bloodGroup;

    document.getElementById("totalDonations").textContent =
        donor.totalDonations;

    document.getElementById("livesImpacted").textContent =
        donor.livesImpacted;

    document.getElementById("lastDonation").textContent =
        donor.lastDonation;


    // =================================
    // AVAILABILITY SWITCH
    // =================================

    function updateAvailability() {

        if (availabilityToggle.checked) {

            availabilityStatus.textContent = "Available";

            availabilityStatus.style.background = "#e6f7ee";
            availabilityStatus.style.color = "#16834a";

        } else {

            availabilityStatus.textContent = "Unavailable";

            availabilityStatus.style.background = "#ffe8eb";
            availabilityStatus.style.color = "#d7192d";

        }

    }

    availabilityToggle.addEventListener("change", updateAvailability);

    // Initial state
    updateAvailability();


    // =================================
    // SIDEBAR NAVIGATION
    // =================================

    const menuItems = document.querySelectorAll(".sidebar-menu .menu-item");

    menuItems.forEach(function (item) {

        item.addEventListener("click", function () {

            menuItems.forEach(function (menu) {
                menu.classList.remove("active");
            });

            item.classList.add("active");

        });

    });


    // =================================
    // NOTIFICATIONS
    // =================================

    notificationButton.addEventListener("click", function () {

        document.getElementById("notifications").scrollIntoView({
            behavior: "smooth"
        });

    });


    // =================================
    // LOGOUT
    // =================================

    logoutButton.addEventListener("click", function () {

        const confirmLogout = confirm(
            "Are you sure you want to leave the Donor Dashboard?"
        );

        if (confirmLogout) {

            // Demo navigation only.
            // Real session logout will be implemented with backend authentication.

            window.location.href = "login.html";

        }

    });


    // =================================
    // INITIAL DASHBOARD MESSAGE
    // =================================

    console.log("BloodBridge Donor Dashboard loaded successfully!");

});
