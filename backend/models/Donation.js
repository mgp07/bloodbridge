
const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
    {
        donor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Donor",
            required: true
        },

        hospital: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hospital",
            required: true
        },

        bloodGroup: {
            type: String,
            required: true,
            enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
        },

        unitsDonated: {
            type: Number,
            required: true,
            min: 1
        },

        donationDate: {
            type: Date,
            required: true
        },

        status: {
            type: String,
            enum: ["Scheduled", "Completed", "Cancelled"],
            default: "Scheduled"
        }
    },
    {
        timestamps: true
    }
);

const Donation = mongoose.model("Donation", donationSchema);

module.exports = Donation;
