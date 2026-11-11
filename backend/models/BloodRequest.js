
const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true
        },

        hospital: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hospital",
            default: null
        },

        bloodGroup: {
            type: String,
            required: true,
            enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
        },

        unitsRequired: {
            type: Number,
            required: true,
            min: 1
        },

        hospitalName: {
            type: String,
            trim: true
        },

        location: {
            type: String,
            required: true
        },

        urgency: {
            type: String,
            enum: ["Normal", "Urgent", "Critical"],
            default: "Normal"
        },

        reason: {
            type: String,
            required: true
        },

        requiredDate: {
            type: Date,
            required: true
        },

        status: {
            type: String,
            enum: ["Pending", "Accepted", "Completed", "Rejected"],
            default: "Pending"
        }
    },
    {
        timestamps: true
    }
);

const BloodRequest = mongoose.model(
    "BloodRequest",
    bloodRequestSchema
);

module.exports = BloodRequest;
