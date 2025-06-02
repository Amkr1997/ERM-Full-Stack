const e = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
      enum: ["engineer", "manager"],
    },

    // Engineer Fields
    department: { type: String },

    skills: [
      {
        type: String,
      },
    ],

    seniority: {
      type: String,
      enum: ["junior", "mid", "senior"],
    },

    maxCapacity: {
      type: Number,
      default: 100,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("CrmUser", UserSchema);
module.exports = User;
