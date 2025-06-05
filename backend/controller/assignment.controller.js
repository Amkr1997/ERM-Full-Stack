const Assignment = require("../models/assignment.model");
const User = require("../models/user.model");
const ProjectUser = require("../models/project.model");
const connectDB = require("../db/db.connect");

const getAllAssignments = async (req, res) => {
  const userId = req.params.userId;

  try {
    await connectDB();

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (userId === user.enigneerId) {
      const allAssignments = await Assignment.find({
        enigneerId: userId,
      }).populate({
        path: "enigneerId",
      });

      if (!allAssignments) {
        return res.status(404).json({ error: "Assignments not found" });
      }

      return res
        .status(200)
        .json({ message: "Assignments fetched successfully", allAssignments });
    } else {
      const allAssignments = await Assignment.find({
        managerId: userId,
      }).populate({
        path: "managerId",
      });

      if (!allAssignments) {
        return res.status(404).json({ error: "Assignments not found" });
      }

      return res
        .status(200)
        .json({ message: "Assignments fetched successfully", allAssignments });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const addNewAssignement = async (req, res) => {
  const assignmentData = req.body;
  const engineerId = req.params.engineerId;
  const projectId = req.params.projectId;

  try {
    await connectDB();

    const existingUser = await User.findById(engineerId);

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const existingProject = await ProjectUser.findById(projectId);

    if (
      new Date(assignmentData.startDate) > new Date(assignmentData.startDate) ||
      new Date(assignmentData.startDate) < new Date(assignmentData.startDate)
    ) {
      return res
        .status(400)
        .json({ error: "Assignment timeline should align with project" });
    }

    const existingAssignments = await Assignment.find({
      enigneerId: engineerId,
    });

    const totalCapacityAllocated = existingAssignments.reduce(
      (acc, curr) => acc + curr.allocationPercentage,
      0
    );

    const remainingCapacity = existingUser.maxCapacity - totalCapacityAllocated;

    console.log(
      "assignmentData.allocationPercentage",
      assignmentData.allocationPercentage
    );

    if (
      assignmentData.allocationPercentage <= remainingCapacity &&
      assignmentData.allocationPercentage > 0
    ) {
      const newAssignment = await Assignment.create({
        ...assignmentData,
        enigneerId: engineerId,
        projectId,
        managerId: existingProject.managerId,
      });

      return res
        .status(200)
        .json({ message: "Assignment created successfully", newAssignment });
    } else {
      return res.status(404).json({ error: "Assignment not created" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateAssignment = async (req, res) => {
  const assignmentId = req.params.id;
  const assignmentToUpdate = req.body;

  try {
    await connectDB();

    const updatedAssignment = await Assignment.findByIdAndUpdate(
      assignmentId,
      assignmentToUpdate,
      { new: true }
    );

    if (!updatedAssignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    return res
      .status(200)
      .json({ message: "Assignment updated successfully", updatedAssignment });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteAssignment = async (req, res) => {
  const assignmentId = req.params.id;

  try {
    await connectDB();

    const deletedAssignment = await Assignment.findByIdAndDelete(assignmentId);

    if (!deletedAssignment) {
      return res.status(404).json({ error: "Assignment not get delete" });
    }

    return res
      .status(200)
      .json({ message: "Assignment deleted successfully", deletedAssignment });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllAssignments,
  addNewAssignement,
  updateAssignment,
  deleteAssignment,
};
