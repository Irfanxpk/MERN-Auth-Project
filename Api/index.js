import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
