const prisma = require("../config/prismaclient");
const { signupValidation } = require("../validators/validators");
const { validationResult } = require("express-validator");
const passwordHasher = require("../utils/passwordhasher");
const asyncHandler = require("express-async-handler");
const ErrorWithStatusCode = require("../errors/statuscode");
const createAccount = [
  signupValidation,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ErrorWithStatusCode(errors.array()[0].msg, 400);
    }

    const height =
      req.body.units === "lbs" ? req.body.height * 2.5 : req.body.height;

    const hashedpassword = await passwordHasher(req.body.password);
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        fullname: `${req.body.firstname + " " + req.body.lastname}`,
        passwordhash: hashedpassword,
        isImperial: req.body.units === "lbs" ? true : false,
        height: height,
        dateofbirth: req.body.dob
      },
    });

    return res.status(201).json({
      data: {
        message: `${req.body.email} has been succesfully registered!`,
        status: 201,
      },
    });
  }),
];

module.exports = createAccount;
