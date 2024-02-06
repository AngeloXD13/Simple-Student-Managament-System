const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  fname: {
    type: String,
    // required: true,
  },
  mname: {
    type: String,
    // required: true,
  },
  lname: {
    type: String,
    // required: true,
  },
  contact: {
    type: String,
    // required: true,
  },
  address: {
    type: String,
    // required: true,
  },
  birthdate: {
    type: Date,
    // required: true,
  },
  course: {
    name: {
      type: String,
    },
    coursecode: {
      type: String,
    },
    // required: true,
  },
  year: {
    type: Number,
    // required: true,
  },
});

module.exports = Student = mongoose.model("student", StudentSchema);
