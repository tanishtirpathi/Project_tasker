import { ApiResponse } from "../config/ApiResp.js";

const healthcheck = (req, res) => {
  res.status(200).json(new ApiResponse(200, { message: "server is runing " }));
};

export {healthcheck};