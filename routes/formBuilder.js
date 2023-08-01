const express = require("express");
const router = express.Router();

const FormBuilder = require("../models/formBuilder");

const getForm = async (req, res, next) => {
  let form;
  try {
    form = await FormBuilder.findById(req.params.id);
    if (form == null)
      return res.status(404).json({ message: "Cannot find form." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.form = form;
  next();
};

router.get("/", async (req, res) => {
  try {
    const forms = await FormBuilder.find();
    res.json(forms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const form = new FormBuilder({
    name: req.body.name,
    data: req.body.data,
  });

  try {
    const newForm = await form.save();
    res.status(201).json(newForm);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/:id", getForm, async (req, res) => {
  res.send(res.form);
});

router.delete("/:id", getForm, async (req, res) => {
  try {
    await res.form.deleteOne();
    res.json({ message: "Deleted user" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", getForm, async (req, res) => {
  const form = res.form;
  form.name = req.body.name;
  form.data = req.body.data;
  form.markModified("data");

  try {
    form.save();
    res.json(form);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
