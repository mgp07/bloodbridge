
const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema(
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

        bloodGroup: {
            type: String,
            required: true,
            enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
        },

        age: {
            type: Number,
            required: true,
            min: 18
        },

        address: {
            type: String,
            required: true
        },

        isAvailable: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const Donor = mongoose.model("Donor", donorSchema);

module.exports = Donor;
