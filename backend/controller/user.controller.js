

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"
import getDataUri from "../utlis/datauri.js";
import cloudinary from "../utlis/Cloudinary.js";

export const register = async (req, res) => {
    try {
      
        const { fullname, email, phone_Number, password, role } = req.body;

        if (!fullname || !phone_Number ||
            !email || !password || !role) {

            return res.status(400).json({
                message: "Please fill in all fields",
                success: false
            }); 
        };
            const file = req.file;
            const fileURI = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileURI.content);
    


  

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "Email already exists",
                success: false,
            })
        }

        const hashpss = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            phone_Number,
            email,
            password: hashpss,
            role,
            Profile:
            {
                profile_pic:cloudResponse.secure_url,
            }

        });

        return res.status(201).json({
            message: " Account created successfully",
            success: true
        })

    } catch (error) {
          console.log(error);
    }
}
export const login = async (req, res) => {
    try {
        const { email, password ,role} = req.body;


        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Please fill in all fields",
                success: false
            });
        };

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Email not found",
                success: false,
            })
        };


        const correctpassword = await bcrypt.compare(password, user.password);
        if (!correctpassword) {
            return res.status(400).json({
                message: "Email not found",
                success: false,
            })
        };


        // check role is correct or not 

        if (role !== user.role) {
            return res.status(400).json({
                message: "Role is incorrect",
                success: false
            })
        }


        const tokendata = {
            userId: user._id
        }
        const token = await jwt.sign(tokendata, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phone_Number: user.phone_Number,
            role: user.role,
            Profile: user.Profile
        }

        return res.status(200).cookie("token", token, { 
            maxAge: 1 * 24 * 60 * 60 * 1000,
             httpOnly: true, 
             sameSite: 'strict' 
            }).json({
            message: `Login Successfull ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
        })
    }
}


export const logout = async (req, res) => {
    try {
        return res.status(200)
        .cookie("token","", { maxAge: 0  })
        .json({
            message: "Logout Successfull",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "logout failed",});
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phone_Number, bio,skills } = req.body;
   
       
        const file = req.file;
        const fileURI = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileURI.content , {
            resource_type: "raw",
        })

 // cloundinary ayega idhar baad mai 
         let skillsArr;
         if(skills){
         skillsArr = skills.split(",");
    }
        const userId = req.id; //middleware auth se ayega ye
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })}

        //updating content
        

        if(fullname)user.fullname = fullname
        if(email)user.email = email
        if(phone_Number) user.phone_Number = phone_Number
        if(bio) user.Profile.bio = bio
        if(skills)user.Profile.skills = skillsArr
        //resume comes later

        if(cloudResponse){
            user.Profile.resume = cloudResponse.secure_url

            
            user.Profile.resumeOriginalName = file.originalname
        }
        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phone_Number: user.phone_Number,
            role: user.role,
            Profile: user.Profile
        }

        return res.status(200).json({
            message: "Profile Updated",
            success:true,
            user,})
    } catch (error) {
        console.log(error);
    }
}