import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
// import path from "path";

dotenv.config();
const PORT = process.env.PORT;
const app = express();


const corsOptions = {
    origin: 'https://mern-she-thrive-front.vercel.app/',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});
app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/posts", postRoutes);
app.use("/user", userRoutes);

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

// const __dirname = path.resolve();
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "/client/build")));

//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//     })
// } else {
    
//     app.get("/", (req, res) => {
//         res.send("API is running...");
//     });
// }
connectDb();
app.listen(PORT, console.log(`Server is listening at Port:-${PORT}`));
