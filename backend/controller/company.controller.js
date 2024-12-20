
import {Company} from "../models/company.model.js"
import getDataUri from "../utlis/datauri.js";
import cloudinary from "../utlis/Cloudinary.js";



export const registerCompany = async (req , res)=>{
    try {
        const {companyName}= req.body;


        if(!companyName){
            console.log("Company name missing in request");
          return  res.status(402).json({
            message: "Company name is required",
                success: false
          });

        }

        let company = await Company.findOne({name:companyName});
        if(company){
            console.log("Company already exists:", companyName);
            return res.status(400).json({
                message:"you cant register same company",
                success: false
            });
        }

        company = await Company.create({
            name:companyName,
            userId:req.id
        });
        console.log("Company created:", company);
        // toast.success("your Company Created Successfully");
        return res.status(200).json({
            message:"company created successfully",
            company,
            success: true
        });
    } catch (error) {
        console.log("Error occurred in registerCompany:", error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
}


// get company


export const getcomapany = async (req , res)=>{
    try {
        const userId = req.id; // logged in user id 
        const companies = await Company.find({userId});
        if(!companies){
            return res.status(404).json({
                message : "companies not found",
                success: false
            });
        }
     return res.status(200).json({
        message : "companies found",
        companies,
        success: true
     })
    } catch (error) {
        console.log(error);
    }
}

// get company by id



export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


///updating


export const updateCompany = async (req , res )=>{

    try {

        const { name ,  description ,  website , location} = req.body;
   
           
        const file=req.file;
        //cloudinary aayega 
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;
    



        const updateData ={name ,  description ,  website , location ,logo};
        const company = await Company.findByIdAndUpdate(req.params.id , updateData , {new : true} );
    
        if(!company){
            return res.status(404).json({
                message : "Company not founded",
                success: false
                
            })
        }


        return res.status(200).json({
            message :"company information updated",
            success: true
            
        })


    } catch (error) {
        console.log(error);
    }
}