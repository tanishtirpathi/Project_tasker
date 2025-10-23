import { AsyncHandller } from "../config/AsyncHandler.js";
import { User } from "../models/user.model.js";
import crypto from "crypto";
import { ApiResponse } from "../config/ApiResp.js";
import { ApiError } from "../config/apiError.js";
const regesterUser = AsyncHandller(async (req, res) => {
  const { email, username, password, fullname } = req.body;
  if (!username || !password || !email || !fullname) {
    throw new ApiError(400, "All fields are required");
  }
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existingUser) throw new ApiError(409, "User already exists");
  const newUser = new User({ username, password, email, fullname });
  await newUser.save();
  const safeUser = newUser.toObject();
  delete safeUser.password;
  const accessToken = newUser.generateAccessToken();
  const { hasedtoken, unhashedtoken, tokenExpiry } =
    newUser.generateEmailVerificationToken();
  const refreshToken = newUser.generateRefreshToken();
  newUser.EmailVerificationToken = hasedtoken;
  newUser.EmailVerificationTokenExpry = tokenExpiry;

  newUser.RefreshTOken = refreshToken;
  await newUser.save();
  console.log("Send this token to user:", unhashedtoken);

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { safeUser, accessToken, refreshToken, hasedtoken, tokenExpiry },
        "User registered successfully"
      )
    );
});
const verfiyUser = AsyncHandller(async (req, res) => {
  //!get token from user
  //!validate token aaya hai ki nai
  //! hasd the unhased token
  //! database me se user find karo toeken ke base pe
  //! then token matach na ho to error
  //! ho jae token matach to is emailed verify field ko true kar do and token ko delete
  //! save the user again
  const { token } = req.params;
  if (!token) {
    throw new ApiError(400, "Token is required");
  }
  const hasedtoken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({ EmailVerificationToken: hasedtoken });
  if (!user) {
    throw new ApiError(400, "user not found ma chuda ab chutitye ");
  }
  user.IsEmailVerified = true;
  user.EmailVerificationToken = undefined;
  user.EmailVerificationTokenExpry = undefined;

  await user.save();
  return res
    .status(201)
    .json(new ApiResponse(201, user, "User registered successfully"));
});
const loginUser = AsyncHandller(async (req, res) => {
  //* user se data lena hai email password
  //* validate
  //* check exist in database or not if not then error
  //* password check karna
  //*access token refresh token generate karake
  //* edit in database
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "email dal chutiye or sahi password bhi   ");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "user exist nai karta bsdk ");
  }
  const matchPassword = await user.isPasswordCorrect(password);
  if (!matchPassword) {
    throw new ApiError(420, "galat password daltat hai maderchod");
  }
  const refreshToken = user.generateRefreshToken();
  user.RefreshTOken = refreshToken;
  await user.save();

  return res
    .status(201)
    .json(new ApiResponse(201, user, "User login successfully"));
});
export { regesterUser, verfiyUser, loginUser };
