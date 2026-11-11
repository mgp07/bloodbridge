
const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            required: true
        },

        age: {
            type: Number,
            required: true
        },

        bloodGroup: {
            type: String,
            required: true,
            enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
        },

        address: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
