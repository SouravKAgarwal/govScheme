import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const eligibilityData = new mongoose.Schema({
  age: { type: Number },
  income: { type: Number },
  occupation: { type: String },
  state: { type: String },
  education: { type: String },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  residencyStatus: { type: String },
  employmentStatus: { type: String },
  aadharCard: { type: Number },
  aadhaarLinkedBankAccount: { type: Boolean, default: true },
  nationality: { type: String, default: "Indian" },
  maritalStatus: {
    type: String,
    enum: ["Single", "Married", "Divorced", "Widow"],
  },
  disabilityStatus: { type: Boolean },
  propertyOwnership: { type: Boolean },
  caste: { type: String },
  annualExpenditure: { type: Number },
});

const emailRegexPattern = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Enter your name"] },
    email: {
      type: String,
      required: [true, "Enter your email"],
      validate: {
        validator: function (value) {
          return emailRegexPattern.test(value);
        },
        message: "Enter a valid email!",
      },
      unique: true,
    },
    password: {
      type: String,
      minLength: [6, "Password must be atleast 6 characters"],
      select: false,
    },
    avatar: { public_id: String, url: String },
    role: { type: String, default: "user" },
    isVerified: { type: Boolean, default: false },
    criteria: eligibilityData,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.signAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN, {
    expiresIn: "5m",
  });
};

userSchema.methods.signRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN, {
    expiresIn: "3d",
  });
};

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
