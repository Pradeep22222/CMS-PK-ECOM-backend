import express from "express";
import { comparePassword, hashPassword } from "../helpers/bcryptHelpers.js";
import {
  emailVerificationValidation,
  loginValidation,
  newAdminUserValidation,
} from "../middlewares/joi-validation/adminUserValidation.js";
import {
  findOneAdminUser,
  insertAdminUser,
  updateOneAdminUser,
} from "../Models/adminusers/adminUserModel.js";
import { v4 as uuidv4 } from "uuid";
import {
  userVerifiedNotification,
  verificationEmail,
} from "../helpers/emailHelper.js";
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
      error.status = 200;
      error.message =
        "there is already another user with the email, either reset the password or register with different email";
    }
    next(error);
  }
});
router.patch(
  "/verify-email",
  emailVerificationValidation,
  async (req, res, next) => {
    try {
      const { emailValidationCode, email } = req.body;
      const user = await updateOneAdminUser(
        { emailValidationCode, email },
        {
          status: "active",
          emailValidationCode: "",
        }
      );
      user?._id
        ? res.json({
            status: "success",
            message: "your account has been verified, you may login now",
          }) && userVerifiedNotification(user)
        : res.json({
            status: "error",
            message: "invalid or expired link, no action was taken",
          });
    } catch (error) {
      next(error);
    }
  }
);
router.post("/login", loginValidation, async (req, res, next) => {
  try {
    const { password, email } = req.body;
    // find if user exist based on the email
    const user = await findOneAdminUser({ email });
    if (user?._id) {
      if (user?.status !== "active") {
        return res.json({
          status: "error",
          message:
            "your account has not been confirmed, please check your email and confirm the account first",
        });
      }
      // we need to verify if the passwoerd send by the use and the hased password are the same
      const isMatched = comparePassword(password, user.password);
      if (isMatched) {
        user.password = undefined;
        return res.json({
          status: "success",
          message: "logged in successfully",
          user,
        });
      }
    }
    res.json({
      status: "error",
      message: "invalid log in information",
    });
  } catch (error) {
    next(error);
  }
});
export default router;
