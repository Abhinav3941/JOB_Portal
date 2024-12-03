import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import {  Contact, Mail, Pen } from 'lucide-react'

import { Label } from '@radix-ui/react-label'
import AppliedJobtbl from './AppliedJobtbl'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { Badge } from './ui/Badge'


const Profile = () => {
    useGetAppliedJobs();

    
  const [open, setOpen] = useState(false);
  const {user} = useSelector(store=>store.auth);
  const isResume = true
  return (
    <div>
   <Navbar/>
   <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar  className="h-24 w-24 rounded-full overflow-hidden border-4 border-gray-200 shadow-md">
                            <AvatarImage src={user?.Profile?.profile_pic} alt="@shadcn"  className="object-cover w-full h-full"/>
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p>{user?.Profile?.bio}</p>
                               </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail/>
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phone_Number}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1'>
                    {
                    (user?.Profile?.skills || []).length 
                     ? user.Profile.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
                : <span>NA</span>
        }
                    </div>
                </div>

                
                <div className='grid w-full max-w-sm items-center gap-1.5'>
               
                    <Label className="text-md font-bold">Resume</Label>
                   
                    
                    {
                       
                       isResume ? <a target='blank' href={user?.Profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.Profile?.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>


            </div>
                 <div className='max-w-4xl mx-auto bg-white riunded-2xl '>
                        <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                        {/* applied job table */}
                        <AppliedJobtbl/>

                 </div>

                 <div>
                  <UpdateProfileDialog open={open}  setOpen= {setOpen}/>
                 </div>
    </div>
  )
}

export default Profile
