const mongoose = require("mongoose");
const client = require("../config");

const DoctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    post: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    fee: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: false,
    },
    count: {
      type: Number,
      required: false,
    },
    language: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = client.model("Doctor", DoctorSchema);

module.exports = Doctor;
