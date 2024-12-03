import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'

import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'




const Signup = () => {

    const [input , setInput] = useState({
        fullname:"",
        email:"",
        phone_Number:"",
        password:"",
        role:"",
        file:""
        
    });

 

    const navigate = useNavigate();
    const {loading , user} = useSelector(store=>store.auth);
    
    const dispatch = useDispatch();


    const changeEventhandler =(e)=>{
        setInput({...input , [e.target.name]: e.target.value});

    }
    const changeFilehandler=(e)=>{
        setInput({...input , file:e.target.files?.[0]});
    }

    const submithandler =async (e)=>{
        e.preventDefault();
        // api call
        const formData = new FormData();
        formData.append('email', input.email);
        formData.append('password', input.password);
        formData.append('role', input.role);
       
        formData.append('fullname', input.fullname);
        formData.append('phone_Number', input.phone_Number);

        
         if(input.file){
            formData.append('file', input.file);
         }
         try {

            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });
    
            if (res.status === 200 || res.status === 201) {
                navigate("/login");
                toast.success("Sign-up successful!");
            }
        } catch (error) {
            console.error("Error:", error);
    
            if (error.response) {
                // Error response from server
                toast.error(error.response.data.message || "An error occurred on the server.");
            } else if (error.request) {
                // Request made but no response received
                toast.error("Network error: Unable to connect to the server.");
            } else {
                // Other errors (e.g., setting up the request)
                toast.error("An unexpected error occurred.");
            }
        }
        finally{
            dispatch(setLoading(false));
        }
          


        useEffect(()=>{
            if(user){
                navigate("/");
            }
        },[])
    
          

    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>

                <form onSubmit={submithandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'   >
                    <h1 className='flex justify-center font-bold mb-5 text-xl'>Sign-up</h1>
                    <div className='my-2'>
                        <Label>Full Name </Label>
                        <Input   autoComplete="on" type="text"
                          value={input.fullname}
                          name="fullname"
                          onChange={changeEventhandler}
                            placeholder="Your Name"
                        >
                        </Input>
                    </div>
                    <div className='my-2'>
                        <Label>Email </Label>
                        <Input  autoComplete="on" type="email"
                        value={input.email}
                        name="email"
                        onChange={changeEventhandler}
                            placeholder="xyz@gmail.com"
                        >
                        </Input>
                    </div>
                    <div className='my-2'>
                        <Label>Phone Number </Label>
                        <Input   autoComplete="on" 
                        type="text"
                          value={input.phone_Number}
                          name="phone_Number"
                          onChange={changeEventhandler}
                            placeholder="Enter your ten digit Phone number"
                        >
                        </Input>
                    </div>
                    <div className='my-2'>
                        <Label>Password </Label>
                        <Input  autoComplete="on"  type="Password"
                          value={input.password}
                          name="password"
                          onChange={changeEventhandler}
                            placeholder="*********"
                        >
                        </Input>
                    </div>

                    <div className='flex item-center justify-between'>
                        <RadioGroup defaultValue="option-one" className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                  
                                    type="radio"
                                    name="role"
                                    value="Student"
                                    checked={input.role === 'Student'}
                                    onChange={changeEventhandler}
                                    className="cursor-pointer">
                                </Input>
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                   
                                    type="radio"
                                    name="role"
                                    value="Recruiter"
                                    checked={input.role === 'Recruiter'}
                                    onChange={changeEventhandler}
                                    className="cursor-pointer">
                                </Input>
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className='flex items-center gap-2'>
                            <label className="font-bold">Profile</label>
                                <input
                                accept="image/*"
                                type="file"
                                onChange={changeFilehandler}
                                className='cursor-pointer'>

                                </input>
                          
                        </div>



                    </div>
                    {
                        loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' /> 
                         Please wait </Button>:<Button type="submit" className="w-full my-4">Sign-up</Button>
                    }
                    
                   <div className=' flex justify-between items-center'>Already have an account?
                    <Link to="/login" className='text-blue-900 font-bold mx-2 '>Login</Link></div>
                </form>
            </div>

        </div>
    )
}

export default Signup
