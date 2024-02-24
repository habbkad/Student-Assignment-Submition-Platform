const model = require("../models/assignments");
const errorResponse = require("../utils/errorResponse");
const studentModel = require("../models/students");
const path = require("path");

//desc   create new assignment
//route  api/v1/:studentsId/assignment
//secure true
exports.submit_assignment = async (req, res, next) => {
  req.body.student = req.params.studentId;
  req.body.user = req.user._id;

  const student = await studentModel.findById(req.params.studentId);
  if (!student) {
    return next(new errorResponse(`no student with id ${id} found`, 404));
  }
  //console.log("***********" + req.user);
  const newAssignment = await model.create(req.body);

  for (let item of student.assignments) {
    console.log(item._id.toString());
    if (item._id.toString() === newAssignment._id.toString()) {
      return next(new errorResponse(`assignment already submitted`, 500));
    }
  }
  student.assignments.push({ _id: newAssignment._id });
  await student.save();

  res.status(200).json({ message: "new assignment", newAssignment });
};

//desc   upload assignment files
//route  api/v1/assignment/:studentsId/:assignmentId/file
//secure true
exports.uploadFiles = async (req, res, next) => {
  const assignment = await model.findById(req.params.assignmentId);
  const student = await studentModel.findById(req.params.studentId);

  if (assignment.user.toString() !== req.user._id) {
    new errorResponse(
      `Not authorized to upload ${req.params.assignmentId}`,
      403
    );
  }

  if (!assignment) {
    return next(
      new errorResponse(
        `Assigment not found with id of ${req.params.assignmentId}`,
        404
      )
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
  file.name = `photo_${assignment._id}${path.parse(file.name).ext}`;

  file.mv(`./assignments/uploads/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new errorResponse(`Problem with file upload`, 500));
    }

    await model.findByIdAndUpdate(req.params.assignmentId, {
      pdfUrl: file.name,
    });

    for (let item of student.assignments) {
      console.log(item._id.toString());
      if (item._id.toString() === assignment._id.toString()) {
        return next(new errorResponse(`assignment already submitted`, 500));
      }
    }
    student.assignments.push({ _id: assignment._id });
    await student.save();

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
};

//desc   get all assignments
//route  api/v1/assignment
//secure false
exports.all_assignment = async (req, res) => {
  const allAssignments = await model.find();
  res.status(200).json({ message: "all assignments", allAssignments });
};

//desc   delete assignment
//route  api/v1/assignment/:id
//secure false
exports.delete_assignment = async (req, res, next) => {
  const { id } = req.params;
  const assignment = await model.findById(req.params.id);
  if (assignment.user.toString() !== req.user._id) {
    new errorResponse(`Not authorized to upload ${req.params.id}`, 403);
  }

  try {
    const deleteOne = await model.findByIdAndDelete(id, (err, item) => {
      if (err) {
        res.status(404).json({ message: "could not delete assignments" });
      }
    });
    if (!deleteOne) {
      res.status(404).json({ message: "assignment not avialable" });
    }
    res.status(200).json({ message: "delete assignments", deleteOne });
  } catch (err) {
    res.status(404).json({ message: "could not delete assignments" });
  }

  next();
};

//desc   get single assignment
//route  api/v1/student/:id
//secure false
exports.get_student_assignments = async (req, res, next) => {
  const { id } = req.params;
  console.log(req.params);
  try {
    const assignment = await model.find({ student: id });
    if (!assignment) {
      res.status(404).json({ message: "assignment not available" });
    }
    res.status(200).json({ message: "single assignment", assignment });
  } catch (err) {
    next(new errorResponse(`assignment not found with id ${id}`, 404));
  }
};
//desc   get single assignment
//route  api/v1/assignment/:id
//secure true
exports.get_single_assignment = async (req, res, next) => {
  const { id } = req.params;
  console.log(req.params);
  try {
    const assignment = await model.findById(id);
    if (!assignment) {
      res.status(404).json({ message: "assignment not available" });
    }
    res.status(200).json({ message: "single assignment", assignment });
  } catch (err) {
    next(new errorResponse(`assignment not found with id ${id}`, 404));
  }
};

// //desc   get all unapproved assignments
// //route  api/v1/assignment
// //secure true
exports.get_unapproved_assignments = async (req, res, next) => {
  try {
    const unapproved = await model.find({ approved: false });

    if (!unapproved) {
      return res.status(404).json({ message: "assignment not available" });
    }
    res.status(200).json({ message: "unapproved assignment", unapproved });
    next();
  } catch (err) {
    next(new errorResponse(`assignment not found with `, 404));
  }
};

//desc   update assignment
//route  api/v1/assignment/:id
//secure false
exports.update_assignment = async (req, res, next) => {
  const { id } = req.params;
  // console.log(req);
  const update = await model.findByIdAndUpdate(id, req.body);
  res.status(200).json({ message: "update assignment", update });
};
