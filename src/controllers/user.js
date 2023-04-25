const useModel = require("../models/user");

//desc   signUp new user
//route  api/v1/user
//secure false
exports.signUpUser = async (req, res) => {
  const { email, password, role } = req.body;
  const user = useModel;
  ;
  console.log(user);
  if (user) {
    return res
      .status(404)
      .json({ success: false, message: "user already exist" });
  }
  await user.create({ email, password, role });

  res.status(200).json({ success: "true", user: newUser });
};
