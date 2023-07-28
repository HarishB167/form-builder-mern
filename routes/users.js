const express = require("express");
const router = express.Router();

const User = require("../models/user");

const getUser = async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null)
      return res.status(404).json({ message: "Cannot find user." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
};

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    age: req.body.age,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/:id", getUser, async (req, res) => {
  res.send(res.user);
});

router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.deleteOne();
    res.json({ message: "Deleted user" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", getUser, async (req, res) => {
  const user = res.user;
  user.name = req.body.name;
  user.age = req.body.age;

  try {
    user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
