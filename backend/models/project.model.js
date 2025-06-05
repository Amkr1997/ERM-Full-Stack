const mongoose = new require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
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

    requiredSkills: [
      {
        type: String,
        required: true,
      },
    ],

    teamSize: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      required: true,
      enum: ["planning", "active", "completed"],
    },

    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CrmUser",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("CrmProject", ProjectSchema);
