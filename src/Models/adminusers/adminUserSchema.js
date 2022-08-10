import mongoose from "mongoose";
const adminUserSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    fName: {
      type: String,
      required: true,
      maxLength: [20, "First name can't be longer than 20 character"],
    },
    lName: {
      type: String,
      required: true,
      maxLength: [20, "First name can't be longer than 20 character"],
    },
    email: {
      type: String,
      unique: true,
      index: 1,
      required: true,
      maxLength: [50, "First name can't be longer than 20 character"],
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      maxLength: [15, "mobile no can't be longer than 20 character"],
    },
    address: {
      type: String,
      maxLength: [100, "First name can't be longer than 20 character"],
      default: "n/a",
    },
    dob: {
      type: Date,
      required: true,
      maxLength: [20, "First name can't be longer than 20 character"],
      default: null,
    },
    emailValidationCode: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
export default mongoose.model("Admin_user", adminUserSchema);
