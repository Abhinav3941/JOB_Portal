import express from "express"
import path from "path"; // Add this line
import { fileURLToPath } from 'url'; // Import fileURLToPath
import { dirname } from 'path'; // Import dirname

import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectdb from "./utlis/db.js";
import userRoute from "./routes/user.routes.js"
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"


dotenv.config({ path: './.env' }); // Add this line




const __filename = fileURLToPath(import.meta.url); // Get the current file's URL
const __dirname = dirname(__filename);
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [
            'http://localhost:5173', // Local development
            'https://job-portal-4o0v.onrender.com', // Deployed frontend
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.error(`CORS error: Origin ${origin} is not allowed`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

app.use(cors(corsOptions));

app.options('*', (req, res) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.sendStatus(200); 
});



const PORT = process.env.PORT || 8000;

// Serve static frontend build files
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html for all unmatched routes
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'index.html'));
// });




// Serve index.html at the root route
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, 'public') }); // Adjust this if necessary
});

//apis

app.use("/api/v1/user" , userRoute);
app.use("/api/v1/company" , companyRoute);
app.use("/api/v1/job" , jobRoute);
app.use("/api/v1/application" , applicationRoute);


app.listen(PORT , ()=>{
    connectdb();
    console.log(`server is running at ${PORT}`);
   
})