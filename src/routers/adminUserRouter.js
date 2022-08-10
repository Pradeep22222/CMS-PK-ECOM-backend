import express from "express";
import { hashPassword } from "../helpers/bcryptHelpers.js";
import { newAdminUserValidation } from "../middlewares/joi-validation/adminUserValidation.js";
import { insertAdminUser } from "../Models/adminusers/adminUserModel.js";
import { v4 as uuidv4 } from "uuid";
import { verificationEmail } from "../helpers/emailHelper.js";
const router = express.Router();

// server side validation
// encrypt user password
// insert into db
// create unique verification code
// send create a link pointing to our frontend with the email and verification code and send to their email

// server side validation
router.post("/", newAdminUserValidation, async (req, res, next) => {
  try {
    console.log(req.body);
    const { password } = req.body;
    req.body.password = hashPassword(password);
    req.body.emailValidationCode = uuidv4();
    const user = await insertAdminUser(req.body);
    if (user?._id) {
      res.json({
        status: "success",
        message:
          "we have sent you and email to verify your account, please check your mail box.",
      });
      const url = `${process.env.ROOT_DOMAIN}/admin/verify-email?c=${user.emailValidationCode}&e=${user.email}`;
      verificationEmail({
        fName: user.fName,
        lName: user.lName,
        email: user.email,
        url,
      });
      return;
    }
    res.json({
      status: "error",
      message: "unable to create the user, please try again laater",
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message =
        "there is already another user with the email, either reset the password or register with different email";
    }
    next(error);
  }
});
router.patch("/verify-email", (req, res, next) => {
  try {
    console.log(req.body);
    res.json({
      status: "success",
      message: "cms verify email to create new user",
    });
  } catch (error) {
    next(error);
  }
});
export default router;
