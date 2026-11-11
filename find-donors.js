// BloodBridge demonstration donor profiles.
// These are fictional examples, NOT real registered donors.

const demoDonors = [
    {
        name: "Sample Donor 01",
        group: "O+",
        location: "Mangaluru"
    },
    {
        name: "Sample Donor 02",
        group: "A+",
        location: "Bantwal"
    },
    {
        name: "Sample Donor 03",
        group: "B+",
        location: "Puttur"
    },
    {
        name: "Sample Donor 04",
        group: "AB+",
        location: "Mangaluru"
    },
    {
        name: "Sample Donor 05",
        group: "O-",
        location: "Bantwal"
    },
    {
        name: "Sample Donor 06",
        group: "A-",
        location: "Udupi"
    },
    {
        name: "Sample Donor 07",
        group: "B-",
        location: "Puttur"
    },
    {
        name: "Sample Donor 08",
        group: "AB-",
        location: "Udupi"
    }
];

let selectedGroup = "All";

const bloodButtons = document.querySelectorAll(".blood-option");
const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const donorGrid = document.getElementById("donorGrid");
const resultCount = document.getElementById("resultCount");
const resultsDescription = document.getElementById("resultsDescription");
const noResults = document.getElementById("noResults");
const resetButton = document.getElementById("resetButton");

// Select blood group

bloodButtons.forEach(button => {

    button.addEventListener("click", function () {

        bloodButtons.forEach(btn => {
            btn.classList.remove("selected");
        });

        this.classList.add("selected");

        selectedGroup = this.dataset.group;

    });

});

// Display donor cards

function displayDonors(donors) {

    donorGrid.innerHTML = "";

    resultCount.textContent = donors.length;

    if (donors.length === 0) {

        noResults.hidden = false;
        donorGrid.style.display = "none";

        return;
    }

    noResults.hidden = true;
    donorGrid.style.display = "grid";

    donors.forEach(donor => {

        const card = document.createElement("article");

        card.className = "donor-card";

        card.innerHTML = `
            <div class="donor-card-top">

                <div class="donor-avatar">♥</div>

                <span class="blood-badge">
                    ${donor.group}
                </span>

            </div>

            <h3>${donor.name}</h3>

            <p class="donor-location">
                ⌖ ${donor.location}
            </p>

            <span class="donor-status">
                DEMO PROFILE
            </span>

            <span class="donor-demo-label">
                Example only · Not a real donor
            </span>
        `;

        donorGrid.appendChild(card);

    });

}

// Search donors

function searchDonors() {

    const location = locationInput.value.trim().toLowerCase();

    const filteredDonors = demoDonors.filter(donor => {

        const matchesGroup =
            selectedGroup === "All" ||
            donor.group === selectedGroup;

        const matchesLocation =
            location === "" ||
            donor.location.toLowerCase().includes(location);

        return matchesGroup && matchesLocation;

    });

    displayDonors(filteredDonors);

    resultsDescription.textContent =
        `Showing ${filteredDonors.length} matching demonstration profiles.`;

}

// Search button

searchButton.addEventListener("click", searchDonors);

// Press Enter to search

locationInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        searchDonors();
    }

});

// Reset filters

resetButton.addEventListener("click", function () {

    selectedGroup = "All";
    locationInput.value = "";

    bloodButtons.forEach(button => {
        button.classList.toggle(
            "selected",
            button.dataset.group === "All"
        );
    });

    searchDonors();

});

// Initial display

displayDonors(demoDonors);