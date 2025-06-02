const express = require("express");
const router = express.Router();

const {
  getAllProjects,
  getSingleProject,
  addNewProject,
  updateProject,
  deleteProject,
} = require("../controller/project.controller");

router.post("/add/new/project", addNewProject);
router.get("/get/all/projects/:managerId", getAllProjects);
router.get("/get/single/:projectId/user/:managerId", getSingleProject);
router.put("/update/project/:projectId", updateProject);
router.delete("/delete/project/:projectId", deleteProject);

module.exports = router;
