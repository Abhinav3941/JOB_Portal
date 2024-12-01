import { Application } from "../models/application.model.js"
import { Job } from "../models/job.model.js"



export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;


        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required",
                success: false
            });
        }
        // check if user has alredy applied for the job 

        const existApp = await Application.findOne({ job: jobId, applicant: userId });

        if (existApp) {
            return res.status(400).json({
                message: "You have already applied for this job "
                ,
                success: false
            });
        }

        // check if the job existed or not 
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }

        // creat a new application for job 


        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        })


        job.applications.push(newApplication._id);
        await job.save();
        res.status(200).json({
            message: "Job applied successfully",
        
            success:true
        });

    } catch (error) {
        console.log(error);
    }
}


export const getAppliedJobs = async (req, res) => {
    try {

        const userId = req.id;

       
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } },
               
            }

        });

        if (!application) {
            return res.status(404).json({
                message: "No application found",
                success:false
            })
        };



        return res.status(200).json({
            success:true,
            application
        })




    } catch (error) {
        console.log(error)
    }
}


//get all applicant ( if a admin (recuiter) wants to find out how many applicants have applied for his posted jobs)

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant',
                options: { sort: { createdAt: -1 } },
            }
        })

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success:false
            })
        }


        return res.status(200).json({
            message: "job found",
            job: job, 
            succees:true
        })

    } catch (error) {
        console.log(error);
    }
}

export const updatestatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({
                message: "status is required",
                success:false
            })

        };


        // find the aapllication by applicantion id

        const application = await Application.findById({_id:applicationId});
        if (!application) {
            return res.status(400).json({
                message: "application not found",
                success:false
            })
        };

         // update the status

        application.status = status.toLowerCase();

        await application.save();


        return res.status(200).json({
            message: "status updated" ,
            success:true

        });

    } catch (error) {
        console.log(error);
    }
}