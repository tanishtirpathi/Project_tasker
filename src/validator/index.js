import { body } from "express-validator";

const userRegerstrationValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("email is req")
      .isEmail()
      .withMessage("Email is invalid"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("username is required")
      .isLength({ min: 3 })
      .withMessage("username must be 3 charactro long")
      .isLength({ max: 12 })
      .withMessage("it must be not longer than 12 character"),
    body("fullname").trim().notEmpty().withMessage("full name is req"),
  ];
};

const userLoginValidator = () => {
  return [
    body("email").isEmail().withMessage("email is required"),
    body("password").notEmpty().withMessage("password can not be empty "),
  ];
};
export { userRegerstrationValidator };
