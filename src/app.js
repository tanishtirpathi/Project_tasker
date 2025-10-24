import express from "express";
import cookieParser from 'cookie-parser'
const app = express();
app.use(express.json());
app.use(cookieParser());
import healthCheckRouter from "./routes/health.routes.js";
import authRoute from "./routes/auth.routes.js";
app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/auth", authRoute);
export default app;
