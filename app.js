import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from 'mongoose';
import contactsRouter from "./routes/contactsRouter.js";
import userRouter from "./routes/authRouter.js";

dotenv.config(); 

const app = express(); 

mongoose
.connect(process.env.MONGODB_URL)
.then(() => {
  console.log("Database connection successful");
})
.catch((err) => {
  console.log(err);
  process.exit(1);
})

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log("Server is running. Use our API on port: 3000");
});
