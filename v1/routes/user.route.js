const router = require("express").Router();
const multer = require("multer");
const path = require("path"); //to get the file extension
const authorize = require("../../helpers/middlewares/authorize.js");
const { validateUser } = require("../../helpers/middlewares/user.validation");

//Form data if image is presernt in Form
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname == "avatar") cb(null, "uploads/users-avatar");
    else if (file.fieldname == "idDoc") cb(null, "uploads/users-id");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

const {
  createUser,
  fetchAllUser,
  fetchOneUser,
  updateUser,
  deleteUser,
  updateDeleteImages,
  userStatistics,
} = require("../controllers/user.controller");

router.post(
  "/",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "idDoc", maxCount: 1 },
  ]),
  // validateUser,
  // authorize(["teacher", "admin", "student"]),
  createUser
); //when your path get matched with / at that time it will get executed and we are uploading single profile picture

router.put(
  "/:id",
  upload.fields([
    //multer as a middleware
    { name: "avatar", maxCount: 1 },
    { name: "idDoc", maxCount: 1 },
  ]),
  validateUser,
  authorize(["superadmin", "admin", "student"]),
  updateUser
);

router.delete("/:id", authorize(["teacher", "admin"]), deleteUser);

//http://localhost:2020/api/v1/users/statistics?role="customer"
router.get("/statistics", authorize(["teacher", "admin"]), userStatistics);

router.get("/:id", authorize(["teacher", "admin", "student"]), fetchOneUser);
router.get("/", authorize(["teacher", "admin"]), fetchAllUser);
router.put(
  "/image/:id",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "idDoc", maxCount: 1 },
  ]),
  validateUser,
  authorize(["teacher", "admin", "student"]),
  updateDeleteImages
);
module.exports = router;
