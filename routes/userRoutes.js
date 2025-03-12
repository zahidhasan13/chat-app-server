const express = require("express");
const { signup, allUsers, login, getSingleUser } = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.get("/", allUsers)
router.get("/find/:id", getSingleUser);



module.exports = router;