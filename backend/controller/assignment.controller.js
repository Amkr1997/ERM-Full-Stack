const Assignment = require("../models/assignment.model");
const User = require("../models/user.model");
const ProjectUser = require("../models/project.model");

const getAllAssignments = async (req, res) => {
  const enigneerId = req.params.enigneerId;

  try {
    const allAssignments = await Assignment.find({ enigneerId }).populate({
      path: "enigneerId",
    });

    if (!allAssignments) {
      return res.status(404).json({ error: "Assignments not found" });
    }

    return res
      .status(200)
      .json({ message: "Assignments fetched successfully", allAssignments });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const addNewAssignement = async (req, res) => {
  const assignmentData = req.body;
  const engineerId = req.params.engineerId;
  const projectId = req.params.projectId;

  try {
    const existingUser = await User.findById(engineerId);

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const existingProject = await ProjectUser.findById(projectId);

    // console.log("existingProject", existingProject);

    if (
      existingProject.startDate > assignmentData.startDate ||
      existingProject.endDate < assignmentData.endDate
    ) {
      return res
        .status(404)
        .json({ error: "Assignment timeline should align with project" });
    }

    const existingAssignments = await Assignment.find({
      engineerId,
    });

    // console.log("existingAssignments", existingAssignments);

    if (!existingAssignments)
      return res.status(404).json({ error: "Assignments not found" });

    const totalCapacityAllocated = existingAssignments.reduce(
      (acc, curr) => acc + curr.allocationPercentage,
      0
    );

    const remainingCapacity = existingUser.maxCapacity - totalCapacityAllocated;

    if (
      assignmentData.allocationPercentage <= remainingCapacity &&
      assignmentData.allocationPercentage > 0
    ) {
      const newAssignment = await Assignment.create({
        ...assignmentData,
        engineerId,
        projectId,
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
