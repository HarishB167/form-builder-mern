const express = require("express");
const router = express.Router();

const FormFill = require("../models/formFill");
const FormBuilder = require("../models/formBuilder");

const getForm = async (req, res, next) => {
  let form;
  try {
    form = await FormFill.findById(req.params.id);
    if (form == null)
      return res.status(404).json({ message: "Cannot find form." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.form = form;
  next();
};

const getFormName = async (formId) => {
  form = await FormBuilder.findById(formId);
  return form.name;
};

router.get("/", async (req, res) => {
  try {
    let forms = await FormFill.find();
    forms = await Promise.all(
      forms.map(async (item) => ({
        _id: item._id,
        formId: item.formId,
        data: item.data,
        formName: await getFormName(item.formId),
      }))
    );
    res.json(forms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const form = new FormFill({
    formId: req.body.formId,
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
  form.formId = req.body.formId;
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
