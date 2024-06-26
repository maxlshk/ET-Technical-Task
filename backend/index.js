import express from "express";
import { PORT, MONGO_URL } from "./config.js";
import mongoose from "mongoose";
import cors from 'cors';
import eventsRoute from "./routes/eventRoute.js";

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
    return res.status(234).send("Event Management API is running!");
});

app.use('/events', eventsRoute);

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB", error);
    });