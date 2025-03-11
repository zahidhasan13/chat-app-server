const express = require("express");
const { signup } = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signup)
router.get("/")



module.exports = router;