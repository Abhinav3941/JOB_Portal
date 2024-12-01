import React from 'react'
import LatestJobscard from './LatestJobscard';
import { useSelector } from 'react-redux'; 
// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8 ,9];



const LatestJobs = () => {

    const {allJobs} = useSelector(store=>store.job);
    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className=' text-6xl font-bold text-center'><span className='text-[#6A38C2]'>Latest</span> Job Openings</h1>
            {/* multiple job card display */}

            <div className="text-xl flex justify-center  my-10">




            
            <div className="flex flex-justify-center grid grid-cols-3 gap-10 my-10 lg:grid-cols ">
                {
                    allJobs.length <= 0 ? <span>No Job Available</span> : allJobs?.slice(0,6).map((job) => <LatestJobscard  key={job._id} job={job}/>)
             
                }
            </div>
            </div>
        </div>
    )
}

export default LatestJobs
