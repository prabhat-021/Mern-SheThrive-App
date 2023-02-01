import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import router from "./routes/postRoutes.js";

dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts",router);

mongoose.set('strictQuery', false);
const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDb Connected To ${connect.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit();
    }
}

connectDb();
app.listen(PORT, console.log(`Server is listening at Port:-${PORT}`));
