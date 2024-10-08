const mongoose = require("mongoose");
const { private } = require("./plugins");
const validator = require("validator");
const bcrypt = require("bcrypt");
  

const teacherSchema = mongoose.Schema(
  {
    // ------------- personal details
    name: {
      type: String,
      required: true,
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
          return /^[0-9]{10}$/.test(value); // mobile number should be 10 digits long
        },
        message: props => `${props.value} is not a valid mobile number!`
      }
    },
    picture: {
      type: String,
      default: "https://i.imgur.com/CR1iy7U.png",
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    bio : {
      type :String,
      default : "Hey, I am using QuizEazy..."
    },
    birthDate : Date,
    role: {
      type: String,
      default : "teacher"
    },

    // ---------- organizational details 
    organization: {
      type: String,
      required: true,
    },
    highestEducation: {
      type: String,
      required: true,
    },
    // college id proof for confirmation
    collegeIdProof: {
      type: String,
      required: true,
    },
    // will used for storing image in cloudinary
    publicId: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    teachingExperience: {
      type : String,
      default : 0
    },

    // ----------- social
    linkedIn: String,
    github: String,    

    // ----------- database related info

    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isTeacherVerified: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      private : true  
    },
    isPasswordUpdated: {
      type: Boolean,
      default: true,
    },
    otp: {
      type: Number,
      default: undefined,
    },
    otpGeneratedTime: { type: String, default: undefined },

  },
  { timestamps: true }
);

teacherSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  // this : represent Model { Teacher }
  const teacher = await this.findOne({ email, _id: { $ne: excludeUserId } });

  return !!teacher;
};

/**
 * Check if password matches the teacher's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
teacherSchema.methods.isPasswordMatch = async function (password) {
  const user = this;

  return bcrypt.compare(password, user.password);
};

teacherSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

teacherSchema.plugin(private);


const Teacher = mongoose.model("tecaher", teacherSchema);

module.exports = Teacher;
