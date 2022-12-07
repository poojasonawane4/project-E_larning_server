const router = require("express").Router();


const {
  createDemo,
  fetchOneDemo,
  admissionUpdate,
  fetchAllDemo,
  fetchOneDemobasedonStudentId
} = require("../controllers/dmo.controller");
router.post("/", createDemo);
router.get("/:id", fetchOneDemo);
router.get("/", fetchAllDemo);
router.put("/:id", admissionUpdate);
module.exports = router;

