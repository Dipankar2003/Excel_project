const facultyModel = require("./../models/facultyModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getRegisterPage = (req, res) => {
  res.render("registerPage");
};

exports.saveRegisterData = async (req, res) => {
  const { FID, email, password, confirmPassword } = req.body;

  const exist = await facultyModel.findOne({ FID });

  if (!exist) {
    if (password != confirmPassword) {
      const msg = "Passward and confirm password should be same";
      res.render("registerPage", { msg });
    } else {
      let hashPassward = await bcrypt.hash(password, 10);

      const facultyDetail = await facultyModel
        .create({ FID, email, password: hashPassward })
        .then((result) => {
          console.log("Data saved");
          const secret = "my-secret-string-used-in-formation-of-token";
          const expiresIn = 3 * 60 * 60 * 24 * 1000;
          const token = jwt.sign({ id: result._id }, secret, {
            expiresIn,
          });

          res.status(201).redirect("/register");
        });
    }
  } else {
    const msg = "This faculty Id already exsist";
    res.render("registerPage", { msg });
  }
};

exports.getLoginPage = (req, res) => {
  res.render("loginpage");
};

exports.postLoginData = async (req, res) => {
  const { FID, password } = req.body;
  const exist = await facultyModel.findOne({ FID });
  if (!exist) {
    const msg = "Please first register";
    res.render("registerPage", { msg });
  } else {
  }
};
