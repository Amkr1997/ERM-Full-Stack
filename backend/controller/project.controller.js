const ProjectUser = require("../models/project.model");
const connectDB = require("../db/db.connect");

const addNewProject = async (req, res) => {
  const projectData = req.body;

  try {
    await connectDB();

    const newProject = await ProjectUser.create(projectData);

    if (!newProject) {
      res.status(404).json({ error: "Project not created" });
    }

    res
      .status(200)
      .json({ message: "Project created successfully", newProject });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllProjects = async (req, res) => {
  const managerId = req.params.managerId;

  try {
    await connectDB();

    const allProjects = await ProjectUser.find({ managerId });

    if (!allProjects) {
      res.status(404).json({ error: "Projects not found" });
    }

    res
      .status(200)
      .json({ message: "Projects fetched successfully", allProjects });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSingleProject = async (req, res) => {
  const projectId = req.params.projectId;
  const managerId = req.params.managerId;

  try {
    await connectDB();

    const singleProject = await ProjectUser.findById(projectId);

    if (!singleProject) {
      res.status(404).json({ error: "Project not found" });
    }

    if (singleProject.managerId !== managerId) {
      res.status(404).json({ error: "Project not found" });
    }

    res
      .status(200)
      .json({ message: "Project fetched successfully", singleProject });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateProject = async (req, res) => {
  const projectId = req.params.id;
  const projectToUpdate = req.body;

  try {
    await connectDB();

    const updatedProject = await ProjectUser.findByIdAndUpdate(
      projectId,
      projectToUpdate,
      { new: true }
    );

    if (!updatedProject) {
      res.status(404).json({ error: "Project not found" });
    }

    res
      .status(200)
      .json({ message: "Project updated successfully", updatedProject });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProject = async (req, res) => {
  const projectId = req.params.id;

  try {
    await connectDB();

    const deletedProject = await ProjectUser.findByIdAndDelete(projectId);

    if (!deletedProject) {
      res.status(404).json({ error: "Project not get delete" });
    }

    res
      .status(200)
      .json({ message: "Project deleted successfully", deletedProject });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addNewProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};
