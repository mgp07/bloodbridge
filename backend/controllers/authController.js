
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");
const Donor = require("../models/Donor");
const Patient = require("../models/Patient");
const Hospital = require("../models/Hospital");

// ========================================
// REGISTER DONOR
// ========================================
const registerDonor = async (req, res) => {
    try {
        const {
            fullName, email, password, phone,
            bloodGroup, age, address
        } = req.body;

        if (
            !fullName || !email || !password || !phone ||
            !bloodGroup || !age || !address
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must contain at least 8 characters."
            });
        }

        const normalizedEmail = email.toLowerCase().trim();

        const existingDonor = await Donor.findOne({
            email: normalizedEmail
        });

        if (existingDonor) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const donor = await Donor.create({
            fullName: fullName.trim(),
            email: normalizedEmail,
            password: hashedPassword,
            phone,
            bloodGroup,
            age,
            address
        });

        return res.status(201).json({
            success: true,
            message: "Donor registered successfully!",
            donor: {
                id: donor._id,
                fullName: donor.fullName,
                email: donor.email,
                bloodGroup: donor.bloodGroup
            }
        });

    } catch (error) {
        console.error("Donor registration error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Donor registration failed."
        });
    }
};


// ========================================
// REGISTER PATIENT
// ========================================
const registerPatient = async (req, res) => {
    try {
        const {
            fullName, email, password, phone,
            age, bloodGroup, address
        } = req.body;

        if (
            !fullName || !email || !password || !phone ||
            !age || !bloodGroup || !address
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must contain at least 8 characters."
            });
        }

        const normalizedEmail = email.toLowerCase().trim();

        const existingPatient = await Patient.findOne({
            email: normalizedEmail
        });

        if (existingPatient) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const patient = await Patient.create({
            fullName: fullName.trim(),
            email: normalizedEmail,
            password: hashedPassword,
            phone,
            age,
            bloodGroup,
            address
        });

        return res.status(201).json({
            success: true,
            message: "Patient registered successfully!",
            patient: {
                id: patient._id,
                fullName: patient.fullName,
                email: patient.email,
                bloodGroup: patient.bloodGroup
            }
        });

    } catch (error) {
        console.error("Patient registration error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Patient registration failed."
        });
    }
};


// ========================================
// REGISTER HOSPITAL
// ========================================
const registerHospital = async (req, res) => {
    try {
        const {
            hospitalName, email, password, phone,
            registrationNumber, address, city
        } = req.body;

        if (
            !hospitalName || !email || !password || !phone ||
            !registrationNumber || !address || !city
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must contain at least 8 characters."
            });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const normalizedRegistrationNumber =
            registrationNumber.trim();

        const existingHospital = await Hospital.findOne({
            $or: [
                { email: normalizedEmail },
                { registrationNumber: normalizedRegistrationNumber }
            ]
        });

        if (existingHospital) {
            return res.status(409).json({
                success: false,
                message: "Hospital email or registration number already exists."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const hospital = await Hospital.create({
            hospitalName: hospitalName.trim(),
            email: normalizedEmail,
            password: hashedPassword,
            phone,
            registrationNumber: normalizedRegistrationNumber,
            address,
            city,
            isVerified: false
        });

        return res.status(201).json({
            success: true,
            message: "Hospital registered. Awaiting admin verification.",
            hospital: {
                id: hospital._id,
                hospitalName: hospital.hospitalName,
                email: hospital.email,
                isVerified: hospital.isVerified
            }
        });

    } catch (error) {
        console.error("Hospital registration error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Hospital registration failed."
        });
    }
};


// ========================================
// LOGIN DONOR, PATIENT OR HOSPITAL
// ========================================
const loginUser = async (req, res) => {
    try {
        const { role, email, password } = req.body;

        if (!role || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Role, email and password are required."
            });
        }

        const models = {
            donor: Donor,
            patient: Patient,
            hospital: Hospital
        };

        const SelectedModel = models[role];

        if (!SelectedModel) {
            return res.status(400).json({
                success: false,
                message: "Invalid account role."
            });
        }

        const normalizedEmail = email.toLowerCase().trim();

        const user = await SelectedModel.findOne({
            email: normalizedEmail
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        if (role === "hospital" && !user.isVerified) {
            return res.status(403).json({
                success: false,
                message: "Your hospital account is awaiting admin verification."
            });
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is missing in .env file.");
        }

        const token = jwt.sign(
            {
                userId: user._id.toString(),
                role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful!",
            token,
            role,
            user: {
                id: user._id,
                name: role === "hospital"
                    ? user.hospitalName
                    : user.fullName,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Login error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Login failed. Please try again."
        });
    }
};


// ========================================
// ADMIN LOGIN
// ========================================
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            });
        }

        const normalizedEmail = email.toLowerCase().trim();

        const admin = await Admin.findOne({
            email: normalizedEmail
        });

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Invalid admin email or password."
            });
        }

        if (!admin.isActive) {
            return res.status(403).json({
                success: false,
                message: "Your admin account is disabled."
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            admin.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid admin email or password."
            });
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is missing in .env file.");
        }

        const token = jwt.sign(
            {
                userId: admin._id.toString(),
                role: "admin"
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        return res.status(200).json({
            success: true,
            message: "Admin login successful!",
            token,
            role: "admin",
            user: {
                id: admin._id,
                name: admin.fullName,
                email: admin.email
            }
        });

    } catch (error) {
        console.error("Admin login error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Admin login failed."
        });
    }
};


// ========================================
// EXPORT ALL CONTROLLERS
// ========================================
module.exports = {
    registerDonor,
    registerPatient,
    registerHospital,
    loginUser,
    loginAdmin
};
