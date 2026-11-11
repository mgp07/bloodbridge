
// ==========================================
// BLOODBRIDGE - PATIENT DASHBOARD
// ==========================================

// Demo patient details
// Later, these details will come from MongoDB.

const patient = {
    name: "Demo Patient",
    email: "patient@example.com",
    phone: "9876543210",
    bloodGroup: "O+",
    city: "Mangalore"
};

// Demo request storage
// Requests will disappear after refreshing the page.
// Later, MongoDB will store them permanently.

let requests = [];

// ==========================================
// 1. DISPLAY PATIENT PROFILE
// ==========================================

document.getElementById("headerName").textContent = patient.name;
document.getElementById("welcomeName").textContent = patient.name;

document.getElementById("profileName").textContent = patient.name;
document.getElementById("profileEmail").textContent = patient.email;
document.getElementById("profilePhone").textContent = patient.phone;
document.getElementById("profileBloodGroup").textContent = patient.bloodGroup;
document.getElementById("profileCity").textContent = patient.city;

document.getElementById("bloodGroup").textContent = patient.bloodGroup;

// ==========================================
// 2. UPDATE DASHBOARD STATISTICS
// ==========================================

function updateStatistics() {

    const total = requests.length;

    const pending = requests.filter(
        request => request.status === "Pending"
    ).length;

    const fulfilled = requests.filter(
        request => request.status === "Fulfilled"
    ).length;

    document.getElementById("totalRequests").textContent = total;
    document.getElementById("pendingRequests").textContent = pending;
    document.getElementById("fulfilledRequests").textContent = fulfilled;
}

// ==========================================
// 3. DISPLAY REQUESTS
// ==========================================

function displayRequests() {

    const requestList = document.getElementById("requestList");
    const historyList = document.getElementById("historyList");

    requestList.replaceChildren();
    historyList.replaceChildren();

    if (requests.length === 0) {

        const emptyMessage = document.createElement("div");
        emptyMessage.className = "empty-state";
        emptyMessage.textContent = "No blood requests created yet.";

        requestList.appendChild(emptyMessage);
        historyList.appendChild(emptyMessage.cloneNode(true));

        return;
    }

    requests.forEach(request => {

        const requestCard = document.createElement("div");
        requestCard.className = "request-item";

        const details = document.createElement("div");

        const heading = document.createElement("h4");
        heading.textContent = `${request.bloodGroup} Blood - ${request.units} Unit(s)`;

        const hospital = document.createElement("p");
        hospital.textContent = `Hospital: ${request.hospital}`;

        const city = document.createElement("p");
        city.textContent = `City: ${request.city}`;

        const urgency = document.createElement("p");
        urgency.textContent = `Urgency: ${request.urgency}`;

        const date = document.createElement("p");
        date.textContent = `Required Date: ${request.requiredDate}`;

        details.append(heading, hospital, city, urgency, date);

        const status = document.createElement("span");
        status.className = "request-status";

        if (request.status === "Fulfilled") {
            status.classList.add("fulfilled");
        } else if (request.status === "Rejected") {
            status.classList.add("rejected");
        }

        status.textContent = request.status;

        requestCard.append(details, status);

        requestList.appendChild(requestCard);
        historyList.appendChild(requestCard.cloneNode(true));
    });
}

// ==========================================
// 4. CREATE BLOOD REQUEST
// ==========================================

const requestForm = document.getElementById("requestForm");
const requestMessage = document.getElementById("requestMessage");

requestForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const bloodGroup = document.getElementById("requestBloodGroup").value;
    const units = Number(document.getElementById("units").value);
    const hospital = document.getElementById("hospital").value.trim();
    const city = document.getElementById("city").value.trim();
    const urgency = document.getElementById("urgency").value;
    const requiredDate = document.getElementById("requiredDate").value;
    const reason = document.getElementById("requestReason").value.trim();

    // Basic validation

    if (!bloodGroup || !units || units < 1 || !hospital || !city ||
        !urgency || !requiredDate) {

        requestMessage.style.color = "#c00018";
        requestMessage.textContent = "Please complete all required fields.";
        return;
    }

    const selectedDate = new Date(requiredDate + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        requestMessage.style.color = "#c00018";
        requestMessage.textContent = "Please select today or a future date.";
        return;
    }

    // Create request object

    const newRequest = {
        id: Date.now(),
        bloodGroup: bloodGroup,
        units: units,
        hospital: hospital,
        city: city,
        urgency: urgency,
        requiredDate: requiredDate,
        reason: reason,
        status: "Pending"
    };

    // Store request temporarily

    requests.unshift(newRequest);

    // Update dashboard

    updateStatistics();
    displayRequests();

    // Show success message

    requestMessage.style.color = "#198548";
    requestMessage.textContent =
        "Blood request created successfully! Status: Pending.";

    // Clear form

    requestForm.reset();
});

// ==========================================
// 5. SIDEBAR NAVIGATION
// ==========================================

const menuItems = document.querySelectorAll(".menu-item");

menuItems.forEach(item => {

    item.addEventListener("click", function () {

        menuItems.forEach(menu => menu.classList.remove("active"));

        this.classList.add("active");
    });
});

// ==========================================
// 6. NOTIFICATION BUTTON
// ==========================================

document.getElementById("notificationButton").addEventListener("click", function () {

    document.getElementById("notifications").scrollIntoView({
        behavior: "smooth"
    });

});

// ==========================================
// 7. LOGOUT
// ==========================================

document.getElementById("logoutButton").addEventListener("click", function () {

    const confirmLogout = confirm("Are you sure you want to logout?");

    if (confirmLogout) {
        window.location.href = "login.html";
    }

});

// ==========================================
// 8. INITIALIZE DASHBOARD
// ==========================================

updateStatistics();
displayRequests();

console.log("BloodBridge Patient Dashboard Loaded Successfully!");
