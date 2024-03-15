const mongoose = require("mongoose");
const { private } = require("./plugins");
const validator = require("validator");

const teacherSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      set: (value) => value.toUpperCase(),
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
      private: true, // used by the private plugin
    },
    mobNo: {
      type: Number,
      required: true,
      validate: {
        validator: function(value) {
          return /^[0-9]{10}$/.test(value); // Assuming the mobile number should be 10 digits long
        },
        message: props => `${props.value} is not a valid mobile number!`
      }
    },
    picture: {
      type: String,
      default: "https://i.imgur.com/CR1iy7U.png",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: undefined,
    },
    isPasswordUpdated: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    otp: {
      type: Number,
      default: undefined,
    },
    otpGeneratedTime: { type: String, default: undefined },
    organization: {
      type: String,
      required: true,
    },
    highestEducation: {
      type: String,
      required: true,
    },
    collegeId: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    teachingExperience: String,
    birthDate:  Date,
    linkedIn: String,
    github: String,
  },
  { timestamps: true }
);

teacherSchema.plugin(private);

const Teacher = mongoose.model("tecaher", teacherSchema);

module.exports = Teacher;
