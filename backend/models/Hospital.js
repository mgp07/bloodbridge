
const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
    {
        hospitalName: {
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

        registrationNumber: {
            type: String,
            required: true,
            unique: true
        },

        address: {
            type: String,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        isVerified: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const Hospital = mongoose.model("Hospital", hospitalSchema);

module.exports = Hospital;
