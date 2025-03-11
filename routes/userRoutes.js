const express = require("express");
const { signup, allUsers, login } = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.get("/", allUsers)



module.exports = router;