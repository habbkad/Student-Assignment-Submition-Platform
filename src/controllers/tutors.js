const tutorModel = require("../models/tutors");
const errorResponse = require("../utils/errorResponse");
const mongoose = require("mongoose");
const path = require("path");

//desc   create new tutor
//route  api/v1/student
//secure false
exports.create_tutor = async (req, res, next) => {
  const { firstName, middleName, lastName, staffId, phone, email, profileUrl } =
    req.body;
  //adding user id to tutor req.body

  req.body.user = req.user._id;

  const index = await tutorModel.find({ staffId });

  if (index != []) {
    return next(
      new errorResponse(
        `Index number ${staffId} available.Input correct index`
      ),
      404
    );
  }
  const tutor = await tutorModel.create(req.body);

  res.status(200).json({ message: "create new tutor sucessful", tutor });
};

//desc   get all Tutors
//route  api/v1/tutor
//secure false
exports.allTutors = async (req, res) => {
  const students = await tutorModel.find();
  res.status(200).json({ message: "all tutors", students });
};
//desc   get one tutor
//route  api/v1/tutor
//secure false
exports.getTutor = async (req, res) => {
  let postObjectId = mongoose.Types.ObjectId(req.params.id);
  const tutor = await tutorModel.findOne({ user: postObjectId });
  if (!tutor) {
    return next(new errorResponse(`no student with id ${id} found`, 404));
  }
  res.status(200).json({ message: "all assignments", tutor });
};

//desc   upload tutor profile
//route  api/v1/students/:studentId/profile
//secure true
exports.uploadFiles = async (req, res, next) => {
  const tutor = await tutorModel.findById(req.params.tutorID);

  if (!tutor) {
    return next();
  }
  //verify is actual user

  if (req.user._id !== tutor.user.toString()) {
    new errorResponse(
      `Not allowed to update student ${req.params.tutorID}`,
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

    await tutorModel.findByIdAndUpdate(req.params.tutorID, {
      profileUrl: file.name,
    });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
};
