//desc   create new student
//route  api/v1/student
//secure false
exports.create_student = (req, res) => {
  res.status(200).json({ message: "create new student" });
};
