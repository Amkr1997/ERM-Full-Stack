const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssignmentSchema = new Schema(
  {
    enigneerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CrmUser",
      required: true,
    },

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CrmProject",
      required: true,
    },

    allocationPercentage: {
      type: Number,
      required: true,
    },

    startDate: {
      type: Date,
      default: Date.now,
    },

    endDate: {
      type: Date,
      default: Date.now,
    },

    role: {
      type: String,
      required: true,
      enum: ["Developer", "Tech Lead", "Designer", "Tester"],
    },
  },
  { timestamps: true }
);

const Assignment = mongoose.model("CrmAssignment", AssignmentSchema);
module.exports = Assignment;
