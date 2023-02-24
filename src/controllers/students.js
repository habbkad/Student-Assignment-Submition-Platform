const studentModel = require("../models/students");
const errorResponse = require("../utils/errorResponse");

//desc   create new student
//route  api/v1/student
//secure false
exports.create_student = async (req, res, next) => {
  const {
    firstName,
    middleName,
    lastName,
    indexNumber,
    gen,
    phone,
    email,
    profileUrl,
  } = req.body;

  const index = await studentModel.find({ indexNumber });
  // console.log(index);
  if (index) {
    return next(
      new errorResponse(
        `Index number ${indexNumber} available.Input correct index`
      ),
      404
    );
  }
  const student = await studentModel.create({
    firstName,
    middleName,
    lastName,
    indexNumber,
    gen,
    phone,
    email,
    profileUrl,
  });

  res.status(200).json({ message: "create new student sucessful", student });
};

//desc   create new student
//route  api/v1/student
//secure false
exports.allStudents = async (req, res) => {
  const students = await studentModel.find();
  res.status(200).json({ message: "all assignments", students });
};
