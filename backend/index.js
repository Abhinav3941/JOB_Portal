import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectdb from "./utlis/db.js";
import userRoute from "./routes/user.routes.js"
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"
dotenv.config({});

const app = express();


app.use(express.json());
app.use(express.urlencoded({extendend:true}));
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173', // Allow requests from this origin
    credentials: true,                // Allow credentials (cookies, authorization headers, etc.)
    // You can add more options here if needed
};

app.use(cors(corsOptions));


const PORT = process.env.PORT || 3000;




//apis

app.use("/api/v1/user" , userRoute);
app.use("/api/v1/company" , companyRoute);
app.use("/api/v1/Job" , jobRoute);
app.use("/api/v1/application" , applicationRoute);
// "http://localhost:8000/api/v1/user/register"
// "http://localhost:8000/api/v1/user/login"
// "http://localhost:8000/api/v1/user/profile/updateProfile"

app.listen(PORT , ()=>{
    connectdb();
    console.log(`server is running at ${PORT}`);
   
})