import app from "./app";
import dotenv from "dotenv";
import connectDB from "./db/db";
dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 7000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("server is running on port ", PORT);
    });
  })
  .catch((err) => {
    console.error("mongodb connection error ", err);
    process.exit(1);
  });
