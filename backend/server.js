import express from "express";
import dotenv from "dotenv";
dotenv.config(); //config dotenv

import { errorHandler, notFound } from "./middleware/errorMiddleware.js"

// importing userRouter
import userRouter from "./routes/userRoutes.js"

const port = process.env.PORT || 4000;
const app = express();

app.use("/api/users", userRouter);
app.get("/", (req, res) => res.send("the server is ready "))

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Sever is running in port ${port}`))