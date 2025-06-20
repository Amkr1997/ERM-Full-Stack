const express = require("express");
const router = express.Router();

const {
  getAllAssignments,
  addNewAssignement,
  updateAssignment,
  deleteAssignment,
} = require("../controller/assignment.controller");

router.get("/get/all/assignments/:userId", getAllAssignments);
router.post("/add/new/:engineerId/assignment/:projectId", addNewAssignement);
router.post("/update/assignment/:id", updateAssignment);
router.delete("/delete/assignment/:id", deleteAssignment);

module.exports = router;
