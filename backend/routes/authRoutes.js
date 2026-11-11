
const express = require("express");
const router = express.Router();

console.log("BloodBridge authRoutes.js loaded successfully!");

const {
    registerDonor,
    registerPatient,
    registerHospital,
    loginUser,
    loginAdmin
} = require("../controllers/authController");

// TEST ROUTE
router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "BloodBridge authentication routes are working!"
    });
});

// DONOR, PATIENT AND HOSPITAL REGISTRATION
router.post("/register/donor", registerDonor);
router.post("/register/patient", registerPatient);
router.post("/register/hospital", registerHospital);

// USER LOGIN
router.post("/login", loginUser);

// ADMIN LOGIN
router.post("/admin/login", loginAdmin);

module.exports = router;
