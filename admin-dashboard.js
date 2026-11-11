
// ==========================================
// BLOODBRIDGE - ADMIN DASHBOARD
// ==========================================

// 1. DEMO ADMIN DETAILS

const admin = {
    name: "Administrator"
};

document.getElementById("adminName").textContent = admin.name;


// ==========================================
// 2. DEMO DATABASE
// ==========================================

// These are sample records for frontend testing.
// Later, MongoDB will provide the actual records.

let donors = [
    {
        id: 1,
        name: "Arun Kumar",
        email: "arun@example.com",
        bloodGroup: "O+",
        city: "Mangalore",
        status: "Active"
    },
    {
        id: 2,
        name: "Priya Sharma",
        email: "priya@example.com",
        bloodGroup: "A+",
        city: "Bangalore",
        status: "Active"
    },
    {
        id: 3,
        name: "Rahul Kumar",
        email: "rahul@example.com",
        bloodGroup: "B+",
        city: "Chennai",
        status: "Inactive"
    }
];

let patients = [
    {
        id: 1,
        name: "Kiran Raj",
        email: "kiran@example.com",
        bloodGroup: "AB+",
        city: "Mangalore"
    },
    {
        id: 2,
        name: "Sneha R",
        email: "sneha@example.com",
        bloodGroup: "O-",
        city: "Bangalore"
    }
];

let hospitals = [
    {
        id: 1,
        name: "City Care Hospital",
        email: "citycare@example.com",
        registration: "HOSP1001",
        city: "Mangalore",
        verification: "Pending"
    },
    {
        id: 2,
        name: "LifeLine Hospital",
        email: "lifeline@example.com",
        registration: "HOSP1002",
        city: "Bangalore",
        verification: "Verified"
    },
    {
        id: 3,
        name: "Health Plus Hospital",
        email: "healthplus@example.com",
        registration: "HOSP1003",
        city: "Chennai",
        verification: "Pending"
    }
];

let bloodRequests = [
    {
        id: 1,
        patient: "Kiran Raj",
        bloodGroup: "AB+",
        units: 2,
        hospital: "City Care Hospital",
        urgency: "Emergency",
        status: "Pending"
    },
    {
        id: 2,
        patient: "Sneha R",
        bloodGroup: "O-",
        units: 1,
        hospital: "LifeLine Hospital",
        urgency: "Urgent",
        status: "Accepted"
    },
    {
        id: 3,
        patient: "Rahul Kumar",
        bloodGroup: "B+",
        units: 2,
        hospital: "Health Plus Hospital",
        urgency: "Normal",
        status: "Fulfilled"
    }
];

let donations = [
    {
        id: 1,
        donor: "Arun Kumar",
        bloodGroup: "O+",
        hospital: "City Care Hospital",
        date: "2026-10-20",
        status: "Completed"
    },
    {
        id: 2,
        donor: "Priya Sharma",
        bloodGroup: "A+",
        hospital: "LifeLine Hospital",
        date: "2026-10-25",
        status: "Completed"
    }
];

let notifications = [
    "Welcome to the BloodBridge Admin Dashboard.",
    "Please review pending hospital verification requests."
];


// ==========================================
// 3. HELPER FUNCTIONS
// ==========================================

function createCell(row, value) {
    const cell = document.createElement("td");
    cell.textContent = value;
    row.appendChild(cell);
    return cell;
}

function createStatusBadge(status) {
    const badge = document.createElement("span");
    badge.className = "status-badge";

    if (status === "Active" || status === "Verified" ||
        status === "Completed") {
        badge.classList.add(
            status === "Active" ? "status-active" :
                status === "Verified" ? "status-verified" :
                    "status-completed"
        );
    } else if (status === "Inactive" || status === "Rejected") {
        badge.classList.add(
            status === "Inactive" ? "status-inactive" : "status-rejected"
        );
    } else {
        badge.classList.add("status-pending");
    }

    badge.textContent = status;
    return badge;
}

function createActionButton(label, className, callback) {
    const button = document.createElement("button");
    button.textContent = label;
    button.className = `table-button ${className}`;
    button.addEventListener("click", callback);
    return button;
}

function showEmptyRow(tableBody, columnCount, message) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");

    cell.colSpan = columnCount;
    cell.className = "empty-state";
    cell.textContent = message;

    row.appendChild(cell);
    tableBody.appendChild(row);
}


// ==========================================
// 4. UPDATE DASHBOARD STATISTICS
// ==========================================

function updateStatistics() {

    document.getElementById("totalDonors").textContent =
        donors.length;

    document.getElementById("totalPatients").textContent =
        patients.length;

    document.getElementById("totalHospitals").textContent =
        hospitals.length;

    document.getElementById("totalBloodRequests").textContent =
        bloodRequests.length;
}


// ==========================================
// 5. DISPLAY DONORS
// ==========================================

function displayDonors() {

    const tableBody = document.getElementById("donorTableBody");
    tableBody.replaceChildren();

    if (donors.length === 0) {
        showEmptyRow(tableBody, 6, "No donors available.");
        return;
    }

    donors.forEach(donor => {

        const row = document.createElement("tr");

        createCell(row, donor.name);
        createCell(row, donor.email);
        createCell(row, donor.bloodGroup);
        createCell(row, donor.city);

        const statusCell = document.createElement("td");
        statusCell.appendChild(createStatusBadge(donor.status));
        row.appendChild(statusCell);

        const actionCell = document.createElement("td");

        const deleteButton = createActionButton(
            "Remove",
            "delete-button",
            function () {
                removeDonor(donor.id);
            }
        );

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
    });
}


// ==========================================
// 6. REMOVE DONOR
// ==========================================

function removeDonor(donorId) {

    const confirmed = confirm("Are you sure you want to remove this donor?");

    if (!confirmed) return;

    donors = donors.filter(donor => donor.id !== donorId);

    updateStatistics();
    displayDonors();

    addNotification("A donor record was removed from the demo dashboard.");
}


// ==========================================
// 7. DISPLAY PATIENTS
// ==========================================

function displayPatients() {

    const tableBody = document.getElementById("patientTableBody");
    tableBody.replaceChildren();

    if (patients.length === 0) {
        showEmptyRow(tableBody, 5, "No patients available.");
        return;
    }

    patients.forEach(patient => {

        const row = document.createElement("tr");

        createCell(row, patient.name);
        createCell(row, patient.email);
        createCell(row, patient.bloodGroup);
        createCell(row, patient.city);

        const actionCell = document.createElement("td");

        const deleteButton = createActionButton(
            "Remove",
            "delete-button",
            function () {
                removePatient(patient.id);
            }
        );

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
    });
}


// ==========================================
// 8. REMOVE PATIENT
// ==========================================

function removePatient(patientId) {

    const confirmed = confirm("Are you sure you want to remove this patient?");

    if (!confirmed) return;

    patients = patients.filter(patient => patient.id !== patientId);

    updateStatistics();
    displayPatients();

    addNotification("A patient record was removed from the demo dashboard.");
}


// ==========================================
// 9. DISPLAY HOSPITALS
// ==========================================

function displayHospitals() {

    const tableBody = document.getElementById("hospitalTableBody");
    tableBody.replaceChildren();

    if (hospitals.length === 0) {
        showEmptyRow(tableBody, 6, "No hospitals available.");
        return;
    }

    hospitals.forEach(hospital => {

        const row = document.createElement("tr");

        createCell(row, hospital.name);
        createCell(row, hospital.email);
        createCell(row, hospital.registration);
        createCell(row, hospital.city);

        const statusCell = document.createElement("td");
        statusCell.appendChild(createStatusBadge(hospital.verification));
        row.appendChild(statusCell);

        const actionCell = document.createElement("td");

        if (hospital.verification === "Pending") {

            const verifyButton = createActionButton(
                "Verify",
                "verify-button",
                function () {
                    verifyHospital(hospital.id);
                }
            );

            actionCell.appendChild(verifyButton);

        } else {

            const verifiedText = document.createElement("span");
            verifiedText.textContent = "Verified";
            verifiedText.style.color = "#198548";
            verifiedText.style.fontSize = "12px";

            actionCell.appendChild(verifiedText);
        }

        const deleteButton = createActionButton(
            "Remove",
            "delete-button",
            function () {
                removeHospital(hospital.id);
            }
        );

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
    });
}


// ==========================================
// 10. VERIFY HOSPITAL
// ==========================================

function verifyHospital(hospitalId) {

    const confirmed = confirm("Verify this hospital registration?");

    if (!confirmed) return;

    const hospital = hospitals.find(
        item => item.id === hospitalId
    );

    if (!hospital) return;

    hospital.verification = "Verified";

    displayHospitals();

    addNotification(
        `${hospital.name} has been marked as verified in the demo.`
    );
}


// ==========================================
// 11. REMOVE HOSPITAL
// ==========================================

function removeHospital(hospitalId) {

    const confirmed = confirm("Are you sure you want to remove this hospital?");

    if (!confirmed) return;

    hospitals = hospitals.filter(
        hospital => hospital.id !== hospitalId
    );

    updateStatistics();
    displayHospitals();

    addNotification("A hospital record was removed from the demo dashboard.");
}


// ==========================================
// 12. DISPLAY BLOOD REQUESTS
// ==========================================

function displayBloodRequests() {

    const tableBody = document.getElementById("requestTableBody");
    tableBody.replaceChildren();

    if (bloodRequests.length === 0) {
        showEmptyRow(tableBody, 6, "No blood requests available.");
        return;
    }

    bloodRequests.forEach(request => {

        const row = document.createElement("tr");

        createCell(row, request.patient);
        createCell(row, request.bloodGroup);
        createCell(row, request.units);
        createCell(row, request.hospital);
        createCell(row, request.urgency);

        const statusCell = document.createElement("td");
        statusCell.appendChild(createStatusBadge(
            request.status === "Fulfilled" ? "Completed" : request.status
        ));
        row.appendChild(statusCell);

        tableBody.appendChild(row);
    });
}


// ==========================================
// 13. DISPLAY DONATION RECORDS
// ==========================================

function displayDonations() {

    const tableBody = document.getElementById("donationTableBody");
    tableBody.replaceChildren();

    if (donations.length === 0) {
        showEmptyRow(tableBody, 5, "No donation records available.");
        return;
    }

    donations.forEach(donation => {

        const row = document.createElement("tr");

        createCell(row, donation.donor);
        createCell(row, donation.bloodGroup);
        createCell(row, donation.hospital);
        createCell(row, donation.date);

        const statusCell = document.createElement("td");
        statusCell.appendChild(createStatusBadge(donation.status));
        row.appendChild(statusCell);

        tableBody.appendChild(row);
    });
}


// ==========================================
// 14. NOTIFICATIONS
// ==========================================

function displayNotifications() {

    const notificationList =
        document.getElementById("notificationList");

    notificationList.replaceChildren();

    if (notifications.length === 0) {

        const empty = document.createElement("div");
        empty.className = "empty-state";
        empty.textContent = "No new notifications.";

        notificationList.appendChild(empty);
        return;
    }

    notifications.forEach(message => {

        const item = document.createElement("div");
        item.className = "notification-item";
        item.textContent = message;

        notificationList.appendChild(item);
    });
}

function addNotification(message) {

    notifications.unshift(message);

    displayNotifications();
}


// ==========================================
// 15. SIDEBAR NAVIGATION
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
// 16. NOTIFICATION BUTTON
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
// 17. LOGOUT
// ==========================================

document.getElementById("logoutButton").addEventListener(
    "click",
    function () {

        const confirmed = confirm("Are you sure you want to logout?");

        if (confirmed) {
            window.location.href = "login.html";
        }

    }
);


// ==========================================
// 18. INITIALIZE ADMIN DASHBOARD
// ==========================================

function initializeDashboard() {

    updateStatistics();

    displayDonors();
    displayPatients();
    displayHospitals();
    displayBloodRequests();
    displayDonations();
    displayNotifications();

    console.log("BloodBridge Admin Dashboard Loaded Successfully!");
}

initializeDashboard();
