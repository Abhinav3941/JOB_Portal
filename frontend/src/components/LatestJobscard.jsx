import React from 'react'
import { useNavigate } from 'react-router-dom'

const LatestJobscard = ({job}) => {
  const navigate = useNavigate();
  return (
    <div onClick={()=> navigate(`/description/${job._id}`)} className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
      <div>
        <h1 className='text-lg font-medium'>{job?.company?.name}</h1>
      </div>
      <div>

        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>
      <div className='flex flex-item-center gap-2 mt-4 '>
        <span className="mr-2 inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">{job?.position}</span>
        <span class="mr-2 inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10">{job?.jobType}</span>
        <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">{job?.salary}LPA</span>

      </div>
    </div>
  )
}

export default LatestJobscard
