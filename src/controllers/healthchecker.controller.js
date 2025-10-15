import { ApiResponse } from "../config/ApiResp.js";
import {AsyncHandller} from "../config/AsyncHandler"
const healthcheck = AsyncHandller((req, res) => {
  res.status(200).json(new ApiResponse(200, { message: "server is runing " }));
});

export {healthcheck};