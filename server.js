import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
const app = express();
const PORT = process.env.PORT || 8000;

// middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use((error, req, res, next) => {
  console.log(error);
  const statusCode = error.status || 404;
  res.status(statusCode).json({
    status: "error",
    message: error.message,
  });
});
app.get("/", (req, res) => {
  res.json({
    message: "Hi there, you got lost?",
  });
});
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`server running at http://localhost:${PORT}`);
});
