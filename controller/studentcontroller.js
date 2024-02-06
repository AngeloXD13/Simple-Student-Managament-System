const express = require("express");
const router = express.Router();

const Student = require("../model/student");

// @route   GET api/students/test
// @desc    Tests students route
// @access  Public
router.get("/test", (req, res) => res.send("student route testing!"));

// @route   GET api/students
// @desc    Get all students
// @access  Public
router.get("/", (req, res) => {
  Student.find()
    .then((students) => res.json(students))
    .catch((err) =>
      res.status(404).json({ nostudentsfound: "No Students found" })
    );
});

// @route   GET api/students/:id
// @desc    Get single student by id
// @access  Public
router.get("/:id", (req, res) => {
  Student.findById(req.params.id)
    .then((student) => res.json(student))
    .catch((err) =>
      res.status(404).json({ nostudentfound: "No Student found" })
    );
});

// @route   POST api/students
// @desc    Add/save student
// @access  Public
router.post("/", (req, res) => {
//   const 
//  { fname,
//   mname,
//   lname,
//   contact,
//   address,
//   birthdate,
//   course,
//   year
//  } req.bidy

  if (fname == "" || fnname == null) {
    return res.json({ msg: "First Name is Required", success: false })
  }
  if (mname === "" || mnname == null) {
    return res.json({ msg: "Middle Name is Required", success: false })
  }
  if (lname === "" || lnname == null) {
    return res.json({ msg: "Lastname is Required", success: false })
  }
  if (contact === "" || contact == null ){
    return res.json({ msg: "Contact is Required", success: false })
  }
  if (Address === "" || contact == null ){
    return res.json({ msg: "Contact is Required", success: false })
  }
 
  console.log("req add", req.body);
  Student.create(req.body)
    .then((student) =>
      res.json({ msg: "Student added successfully", success: true })
    )
    .catch((err) => {
      res.status(400).json({ error: "Unable to add this student" });
      console.error("Error post", err);
    });
});

// @route   PUT api/students/:id
// @desc    Update student by id
// @access  Public
router.put("/:id", (req, res) => {
  Student.findByIdAndUpdate(req.params.id, req.body)
    .then((student) => res.json({ msg: "Updated successfully", success: true }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route   DELETE api/students/:id
// @desc    Delete student by id
// @access  Public
router.delete("/:id", (req, res) => {
  Student.findByIdAndDelete(req.params.id)
    .then((student) =>
      res.json({ mgs: "Student entry deleted successfully", success: true })
    )
    .catch((err) => res.status(404).json({ error: "No such a student" }));
});

module.exports = router;
