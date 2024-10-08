const studentModel = require("../models/students");
const userModel = require("../models/user");
const errorResponse = require("../utils/errorResponse");
const mongoose = require("mongoose");
const path = require("path");

//desc   create new student
//route  api/v1/student
//secure false
exports.create_student = async (req, res, next) => {
  const { indexNumber } = req.body;
  //adding user id to student req.body

  req.body.user = req.user._id;
  req.body.email = req.user.email;

  try {
    const userStudent = await userModel.findById(req.user._id);
    if (!userStudent || userStudent.role !== "student") {
      return next(new errorResponse("user not present or not a student", 404));
    }
    console.log(userStudent);

    const index = await studentModel.find({ indexNumber });

    if (index) {
      return next(
        new errorResponse(
          `Index number ${indexNumber} available.Input correct index`
        ),
        404
      );
    }
    const student = await studentModel.create(req.body);

    res.status(200).json({ message: "create new student sucessful", student });
  } catch (error) {
    res.status(404).json({ message: "Error ", error });
  }
};
//desc   create new student
//route  api/v1/student
//secure false
exports.updateStudent = async (req, res, next) => {
  const {
    firstName,
    middleName,
    lastName,
    gen,
    phone,
    profileUrl,
    indexNumber,
  } = req.body;
  //adding user id to student req.body

  req.body.user = req.user._id;
  req.body.email = req.user.email;
  const { id } = req.params;

  try {
    const userStudent = await userModel.findById(req.user._id);
    if (!userStudent || userStudent.role !== "student") {
      return next(new errorResponse("user not present or not a student", 404));
    }
    console.log(userStudent);

    const index = await studentModel.find({ indexNumber });

    if (!index) {
      return next(
        new errorResponse(
          `Index number ${indexNumber} available.Input correct index`
        ),
        404
      );
    }
    const student = await studentModel.findByIdAndUpdate(id, req.body);

    res.status(200).json({ message: "update new student sucessful", student });
  } catch (error) {
    res.status(404).json({ message: "Error ", error });
  }
};

//desc   get all students
//route  api/v1/student
//secure false
exports.allStudents = async (req, res) => {
  const students = await studentModel.find();
  res.status(200).json({ message: "all assignments", students });
};
//desc   get one student
//route  api/v1/student
//secure false
exports.getStudent = async (req, res, next) => {
  console.log(req.params.id);

  let postObjectId = mongoose.Types.ObjectId(req.params.id);
  const student = await studentModel.findOne({ user: postObjectId });
  console.log(student);

  if (!student) {
    return next(
      new errorResponse(`no student with id ${postObjectId} found`, 404)
    );
  }
  res.status(200).json({ message: "all assignments", student });
};

//desc   upload student profile
//route  api/v1/students/:studentId/profile
//secure true
exports.uploadFiles = async (req, res, next) => {
  const student = await studentModel.findById(req.params.studentId);

  if (!student) {
    return next();
  }
  //verify is actual user

  if (req.user._id !== student.user.toString()) {
    new errorResponse(
      `Not allowed to update student ${req.params.studentId}`,
      403
    );
  }
  if (!req.files) {
    return next(new errorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;
  console.log(file);

  // Make sure the image is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new errorResponse(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > 1000000) {
    return next(
      new errorResponse(`Please upload an image less than ${1000000}`, 400)
    );
  }

  // Create custom filename
  file.name = `photo_${student._id}${path.parse(file.name).ext}`;

  file.mv(`./profile/uploads/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new errorResponse(`Problem with file upload`, 500));
    }

    await studentModel.findByIdAndUpdate(req.params.studentId, {
      profileUrl: file.name,
    });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
};
