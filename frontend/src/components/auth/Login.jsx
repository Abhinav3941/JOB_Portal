import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/Radio-group'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'



const Login = () => {

    const [input, setInput] = useState({

        email: "",
        password: "",
        role: "",


    });


    const navigate = useNavigate();
    const dispatch = useDispatch();


    const { loading ,user} = useSelector(store => store.auth);


    const changeEventhandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });

    }

    const submithandler = async (e) => {
        e.preventDefault();
        try {

            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            if (res.status === 200 || res.status === 201) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }

        finally {
            dispatch(setLoading(false));
        }



    }

    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])



    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>

                <form onSubmit={submithandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'   >
                    <h1 className='flex justify-center font-bold mb-5 text-xl'>Login</h1>

                    <div className='my-2'>
                        <Label>Email </Label>
                        <Input
                            autoComplete="on"
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventhandler}
                            placeholder="xyz@gmail.com"
                        >
                        </Input>
                    </div>

                    <div className='my-2'>
                        <Label>Password </Label>
                        <Input autoComplete="on" type="Password"
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
                                    onChange={changeEventhandler}
                                    checked={input.role === 'Student'}
                                    className="cursor-pointer">
                                </Input>
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input

                                    type="radio"
                                    name="role"
                                    value="Recruiter"
                                    onChange={changeEventhandler}
                                    checked={input.role === 'Recruiter'}
                                    className="cursor-pointer">
                                </Input>
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {
                        loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />  Please wait </Button> : <Button type="submit" className="w-full my-4">Login</Button>
                    }

                    <div className='flex justify-between items-center'>Don't have an account?<Link to="/Signup" className='text-blue-900 font-bold mx-2 '>Sign-up</Link></div>
                </form>
            </div>

        </div>
    )
}

export default Login
