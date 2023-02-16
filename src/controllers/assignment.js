const model = require("../models/assignments");
const errorResponse = require("../utils/errorResponse");

//desc   create new assignment
//route  api/v1/assignment
//secure false
exports.submit_assignment = async (req, res) => {
  // console.log(req.body);
  const { title, indexNumber, gen, week, github_link, topic, pdfUrl } =
    req.body;
  const newAssignment = await new model({
    title,
    indexNumber,
    gen,
    week,
    github_link,
    topic,
    pdfUrl,
  }).save();

  res.status(200).json({ message: "new assignment", newAssignment });
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
  console.log(id);
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
exports.get_single_assignment = async (req, res, next) => {
  const { id } = req.params;
  try {
    const assignment = await model.findOne({ _id: id });
    if (!assignment) {
      res.status(404).json({ message: "assignment not available" });
    }
    res.status(200).json({ message: "single assignment", assignment });
  } catch (err) {
    next(new errorResponse(`assignment not found with id ${id}`, 404));
  }
};

//desc   update assignment
//route  api/v1/assignment/:id
//secure false
exports.update_assignment = async (req, res, next) => {
  const { id } = req.params;
  const update = await model.findByIdAndUpdate(id, { title: "JavaScript" });
  res.status(200).json({ message: "update assignment", update });
};
