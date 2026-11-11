
// ==========================================
// BLOODBRIDGE - HOSPITAL DASHBOARD
// ==========================================

// Demo hospital details

const hospital = {
    name: "Demo Hospital",
    email: "hospital@example.com",
    phone: "9876543210",
    registration: "HOSP12345",
    city: "Mangalore"
};

// Display hospital information

document.getElementById("hospitalName").textContent = hospital.name;
document.getElementById("profileHospitalName").textContent = hospital.name;
document.getElementById("profileEmail").textContent = hospital.email;
document.getElementById("profilePhone").textContent = hospital.phone;
document.getElementById("profileRegistration").textContent = hospital.registration;
document.getElementById("profileCity").textContent = hospital.city;

// ==========================================
// 1. DEMO BLOOD REQUESTS
// ==========================================

// These are sample requests for testing.
// Later, they will come from the backend and MongoDB.

let bloodRequests = [
    {
        id: 1,
        patientName: "Rahul Kumar",
        bloodGroup: "O+",
        units: 2,
        city: "Mangalore",
        hospital: "Demo Hospital",
        urgency: "Emergency",
        requiredDate: "2026-11-10",
        reason: "Emergency surgery",
        status: "Pending"
    },
    {
        id: 2,
        patientName: "Priya Sharma",
        bloodGroup: "A+",
        units: 1,
        city: "Mangalore",
        hospital: "Demo Hospital",
        urgency: "Urgent",
        requiredDate: "2026-11-12",
        reason: "Medical treatment",
        status: "Pending"
    },
    {
        id: 3,
        patientName: "Arun Kumar",
        bloodGroup: "B+",
        units: 3,
        city: "Mangalore",
        hospital: "Demo Hospital",
        urgency: "Normal",
        requiredDate: "2026-11-15",
        reason: "Planned procedure",
        status: "Pending"
    }
];

// Notifications

let notifications = [];

// ==========================================
// 2. UPDATE STATISTICS
// ==========================================

function updateStatistics() {

    const total = bloodRequests.length;

    const pending = bloodRequests.filter(
        request => request.status === "Pending"
    ).length;

    const accepted = bloodRequests.filter(
        request => request.status === "Accepted"
    ).length;

    const completed = bloodRequests.filter(
        request => request.status === "Fulfilled"
    ).length;

    document.getElementById("totalRequests").textContent = total;
    document.getElementById("pendingRequests").textContent = pending;
    document.getElementById("acceptedRequestsCount").textContent = accepted;
    document.getElementById("completedRequestsCount").textContent = completed;
}

// ==========================================
// 3. CREATE REQUEST CARD
// ==========================================

function createRequestCard(request, showActions = false) {

    const card = document.createElement("div");
    card.className = "request-item";

    const details = document.createElement("div");
    details.className = "request-details";

    const heading = document.createElement("h4");
    heading.textContent =
        `${request.bloodGroup} Blood - ${request.units} Unit(s)`;

    const patient = document.createElement("p");
    patient.textContent = `Patient: ${request.patientName}`;

    const hospitalName = document.createElement("p");
    hospitalName.textContent = `Hospital: ${request.hospital}`;

    const location = document.createElement("p");
    location.textContent = `City: ${request.city}`;

    const urgency = document.createElement("p");
    urgency.textContent = `Urgency: ${request.urgency}`;

    const date = document.createElement("p");
    date.textContent = `Required Date: ${request.requiredDate}`;

    const reason = document.createElement("p");
    reason.textContent = `Reason: ${request.reason || "Not specified"}`;

    details.append(
        heading,
        patient,
        hospitalName,
        location,
        urgency,
        date,
        reason
    );

    card.appendChild(details);

    if (showActions && request.status === "Pending") {

        const actions = document.createElement("div");
        actions.className = "request-actions";

        const acceptButton = document.createElement("button");
        acceptButton.className = "action-button accept-button";
        acceptButton.textContent = "Accept";

        acceptButton.addEventListener("click", function () {
            updateRequestStatus(request.id, "Accepted");
        });

        const rejectButton = document.createElement("button");
        rejectButton.className = "action-button reject-button";
        rejectButton.textContent = "Reject";

        rejectButton.addEventListener("click", function () {
            updateRequestStatus(request.id, "Rejected");
        });

        actions.append(acceptButton, rejectButton);
        card.appendChild(actions);

    } else if (showActions && request.status === "Accepted") {

        const actions = document.createElement("div");
        actions.className = "request-actions";

        const completeButton = document.createElement("button");
        completeButton.className = "action-button complete-button";
        completeButton.textContent = "Mark Completed";

        completeButton.addEventListener("click", function () {
            updateRequestStatus(request.id, "Fulfilled");
        });

        actions.appendChild(completeButton);
        card.appendChild(actions);

    } else {

        const status = document.createElement("span");
        status.className = "request-status";

        if (request.status === "Accepted") {
            status.classList.add("accepted");
        } else if (request.status === "Fulfilled") {
            status.classList.add("fulfilled");
        } else if (request.status === "Rejected") {
            status.classList.add("rejected");
        }

        status.textContent = request.status;
        card.appendChild(status);
    }

    return card;
}

// ==========================================
// 4. DISPLAY REQUESTS
// ==========================================

function displayRequests() {

    const incomingList = document.getElementById("incomingRequestList");
    const acceptedList = document.getElementById("acceptedRequestList");
    const completedList = document.getElementById("completedRequestList");

    incomingList.replaceChildren();
    acceptedList.replaceChildren();
    completedList.replaceChildren();

    const bloodFilter =
        document.getElementById("filterBloodGroup").value;

    const urgencyFilter =
        document.getElementById("filterUrgency").value;

    const filteredRequests = bloodRequests.filter(request => {

        const matchesBlood =
            !bloodFilter || request.bloodGroup === bloodFilter;

        const matchesUrgency =
            !urgencyFilter || request.urgency === urgencyFilter;

        return matchesBlood && matchesUrgency;
    });

    // Pending requests

    const pendingRequests = filteredRequests.filter(
        request => request.status === "Pending"
    );

    if (pendingRequests.length === 0) {
        showEmptyMessage(incomingList, "No matching incoming requests.");
    } else {
        pendingRequests.forEach(request => {
            incomingList.appendChild(createRequestCard(request, true));
        });
    }

    // Accepted requests

    const acceptedRequests = bloodRequests.filter(
        request => request.status === "Accepted"
    );

    if (acceptedRequests.length === 0) {
        showEmptyMessage(acceptedList, "No accepted requests yet.");
    } else {
        acceptedRequests.forEach(request => {
            acceptedList.appendChild(createRequestCard(request, true));
        });
    }

    // Completed requests

    const completedRequests = bloodRequests.filter(
        request => request.status === "Fulfilled"
    );

    if (completedRequests.length === 0) {
        showEmptyMessage(completedList, "No completed requests yet.");
    } else {
        completedRequests.forEach(request => {
            completedList.appendChild(createRequestCard(request));
        });
    }
}

// ==========================================
// 5. EMPTY MESSAGE
// ==========================================

function showEmptyMessage(container, message) {

    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = message;

    container.appendChild(empty);
}

// ==========================================
// 6. ACCEPT / REJECT / COMPLETE REQUESTS
// ==========================================

function updateRequestStatus(requestId, newStatus) {

    const request = bloodRequests.find(
        item => item.id === requestId
    );

    if (!request) {
        return;
    }

    const actionText = {
        Accepted: "accept",
        Rejected: "reject",
        Fulfilled: "mark as completed"
    };

    const confirmed = confirm(
        `Are you sure you want to ${actionText[newStatus]} this request?`
    );

    if (!confirmed) {
        return;
    }

    request.status = newStatus;

    notifications.unshift(
        `${request.bloodGroup} blood request for ${request.patientName} was ${newStatus.toLowerCase()}.`
    );

    updateStatistics();
    displayRequests();
    displayNotifications();
}

// ==========================================
// 7. FILTER REQUESTS
// ==========================================

document.getElementById("filterBloodGroup").addEventListener(
    "change",
    displayRequests
);

document.getElementById("filterUrgency").addEventListener(
    "change",
    displayRequests
);

// ==========================================
// 8. DISPLAY NOTIFICATIONS
// ==========================================

function displayNotifications() {

    const notificationList =
        document.getElementById("notificationList");

    notificationList.replaceChildren();

    if (notifications.length === 0) {
        showEmptyMessage(notificationList, "No new notifications.");
        return;
    }

    notifications.forEach(message => {

        const notification = document.createElement("div");
        notification.className = "notification-item";
        notification.textContent = message;

        notificationList.appendChild(notification);
    });
}

// ==========================================
// 9. SIDEBAR NAVIGATION
// ==========================================

const menuItems = document.querySelectorAll(".menu-item");

menuItems.forEach(item => {

    item.addEventListener("click", function () {

        menuItems.forEach(menu => {
            menu.classList.remove("active");
        });

        this.classList.add("active");
    });
});

// ==========================================
// 10. NOTIFICATION BUTTON
// ==========================================

document.getElementById("notificationButton").addEventListener(
    "click",
    function () {

        document.getElementById("notifications").scrollIntoView({
            behavior: "smooth"
        });

    }
);

// ==========================================
// 11. LOGOUT
// ==========================================

document.getElementById("logoutButton").addEventListener(
    "click",
    function () {

        const confirmLogout = confirm("Are you sure you want to logout?");

        if (confirmLogout) {
            window.location.href = "login.html";
        }

    }
);

// ==========================================
// 12. INITIALIZE DASHBOARD
// ==========================================

updateStatistics();
displayRequests();
displayNotifications();

console.log("BloodBridge Hospital Dashboard Loaded Successfully!");
