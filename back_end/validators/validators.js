const { body } = require("express-validator");
const bcrypt = require("bcryptjs");
const prisma = require("../config/prismaclient");
const emptyError = "this field cannot be empty!";
const emailError = "Not a valid email address, please try again!";
require("dotenv").config();
const signupValidation = [
  body("firstname")
    .trim()
    .notEmpty()
    .withMessage(`First Name ${emptyError}`)
    .escape(),
  body("lastname")
    .trim()
    .notEmpty()
    .withMessage(`Last Name: ${emptyError}`)
    .escape(),

  body("email")
    .trim()
    .notEmpty()
    .withMessage(`Email: ${emptyError}`)
    .normalizeEmail()
    .isEmail()
    .withMessage(`Email: ${emailError}`)
    .custom(async (value) => {
      const email = await prisma.user.findFirst({
        where: {
          email: value,
        },
      });
      if (email) {
        throw new Error(
          "Email is already registered! Please use another email!"
        );
      }
    }),

  body("password")
    .trim()
    .notEmpty()
    .withMessage(`Password :${emptyError}`)
    .escape()
    .isLength({ min: 8 })
    .withMessage("Password must be a minimum of 8 characters long")
    .matches(/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/)
    .withMessage(
      "Password must contain only alphanumeric and special characters"
    ),

  body("confirmpassword")
    .trim()
    .notEmpty()
    .withMessage(`Confirm Password: ${emptyError}`)
    .escape()
    .custom(async (value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords must match!"),

  body("units")
    .trim()
    .notEmpty()
    .withMessage(`Desired Units: ${emptyError}`)
    .custom((value) => {
      return value === "kgs" || value === "lbs";
    })
    .withMessage(`Desired units: Invalid Selection, please select again!`),

  body("signupcode")
    .trim()
    .notEmpty()
    .withMessage(`Sign Up Code: ${emptyError}`)
    .custom((value) => {
      return value === process.env.SIGN_UP_CODE;
    })
    .withMessage(`This is not the correct sign up code! Please try again!`),

  body("height")
    .notEmpty()
    .withMessage(`Height: ${emptyError}`)
    .isNumeric()
    .withMessage(`Height: must be a number!`)
    .custom((value) => {
      return value > 0;
    })
    .withMessage(`Height: must be a positive, non-zero number`),

  body("dob")
    .custom((value) => {
      const today = new Date();
      const userDob = new Date(value);

      const diff = today.getTime() - userDob.getTime();

      const years = diff / (1000 * 60 * 60 * 24 * 7 * 52);
      return years >= 18;
    })
    .withMessage(`Date of Birth: User must be 18!`),
];

const loginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage(`Email : ${emptyError}`)
    .normalizeEmail()
    .isEmail()
    .withMessage(`This is not a valid email! Please enter a valid email!`),

  body("password").trim().notEmpty().withMessage(`Password: ${emptyError}`),
];

// TODO Add validation for updating your weight and posting a weight for a day

const createWeightEntryValidation = [
  body("weight")
    .trim()
    .notEmpty()
    .withMessage(`Weight: ${emptyError}`)
    .isFloat()
    .withMessage(`Weight: provided value must be a number!`)
    .custom((value) => {
      return value > 0;
    })
    .withMessage(`Weight: weight cannot be zero!`),

  body("date").trim().notEmpty().withMessage(`Date: ${emptyError}`),

  body("notes").optional(),
];

const updateAccountValidation = [
  body("height")
    .trim()
    .notEmpty()
    .withMessage(`Fullname: ${emptyError}`)
    .custom((value) => {
      return value > 0;
    })
    .withMessage(`Height: must be a non-zero number`),
];

const dietValidation = [
  body("goal").trim().notEmpty().withMessage(`Goal: ${emptyError}`),

  body("diet").trim().notEmpty().withMessage(`Diet: ${emptyError}`),
];

const dateFilterValidation = [
  body("startdate").trim().notEmpty().withMessage(`Start Date: ${emptyError}`),

  body("enddate").trim().notEmpty().withMessage(`End Date: ${emptyError}`),
];

const deleteAccountValidation = [
  body("password").trim().notEmpty().withMessage(`Password: ${emptyError}`),
];

const onboardThirdPartyCredentialsValidation = [
  body("units")
    .trim()
    .notEmpty()
    .withMessage(`Desired Units: ${emptyError}`)
    .custom((value) => {
      return value === "kgs" || value === "lbs";
    })
    .withMessage(`Desired units: Invalid Selection, please select again!`),

  body("height")
    .notEmpty()
    .withMessage(`Height: ${emptyError}`)
    .isNumeric()
    .withMessage(`Height: must be a number!`)
    .custom((value) => {
      return value > 0;
    })
    .withMessage(`Height: must be a positive, non-zero number`),
  ,
  body("dob")
    .isISO8601()
    .withMessage("Date of Birth: must be a valid date (YYYY-MM-DD)!")
    .custom((value) => {
      const today = new Date();
      const userDob = new Date(value);

      const diff = today.getTime() - userDob.getTime();
      const years = diff / (1000 * 60 * 60 * 24 * 7 * 52);
      return years >= 18;
    })
    .withMessage(`Date of Birth: User must be 18 or older!`),
];
module.exports = {
  signupValidation,
  loginValidation,
  createWeightEntryValidation,
  updateAccountValidation,
  dietValidation,
  dateFilterValidation,
  deleteAccountValidation,
  onboardThirdPartyCredentialsValidation
};
