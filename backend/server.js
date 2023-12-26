import express, { urlencoded } from "express";
import dotenv from "dotenv";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config(); //config dotenv

import dbConnect from "./config/dbConnect.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//databse connection
dbConnect();

import { errorHandler, notFound } from "./middleware/errorMiddleware.js"

// importing userRouter
import userRouter from "./routes/userRoutes.js";

// import admin Router 
import adminRouter from "./routes/adminRoute.js"

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);

app.get("/", (req, res) => res.send("the server is ready "));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Sever is running in port ${port}`))