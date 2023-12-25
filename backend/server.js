import express, { urlencoded } from "express";
import dotenv from "dotenv";
dotenv.config(); //config dotenv

import dbConnect from "./config/dbConnect.js";
import cookieParser from "cookie-parser";

//databse connection
dbConnect();

import { errorHandler, notFound } from "./middleware/errorMiddleware.js"

// importing userRouter
import userRouter from "./routes/userRoutes.js"

const port = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(cookieParser());
app.use("/api/users", userRouter);

app.get("/", (req, res) => res.send("the server is ready "));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Sever is running in port ${port}`))