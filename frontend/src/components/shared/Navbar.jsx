import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });

      console.log('Logout response:', res); // Debug response

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      } else {
        console.log("Logout failed:", res.data.message);
        toast.error("Logout failed.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };


  return (
    <div className='bg-white'>
      <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
        <div>
          {/* ye left ke liye hai */}
          <h1 className='text-2xl font-bold'>Job<span className='text-[#f83002]'>Portal</span></h1>

        </div>



        <div className='flex  item-center gap-16'>
          {/* ye right ke liye hai */}
          <ul className='flex font-medium items-center gap-5'>
            {
              user && user.role === 'Recruiter' ? (
                <>
                  <li><Link to="/admin/companies">Companies</Link></li>
                  <li><Link to="/admin/jobs">Jobs</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/jobs">Jobs</Link></li>
                  <li><Link to="/browse">Browse</Link></li>
                </>
              )
            }


          </ul>
          {
            !user ? (
              <div className='flex items-center gap-2'>
                <Link to={"/login"}><Button varient="outline">Login</Button></Link>
                <Link to={"/signup"}><Button className="text-white bg-[#6A38C2] hover:bg-[#5b30a6]"> Signup</Button></Link>
              </div>
            ) : (


              //src="https://github.com/shadcn.png"
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.Profile?.profile_pic} alt="@shadcn" />

                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-full max-w-[90vw] sm:max-w-xs  whitespace-normal break-words rounded-lg border border-blue-gray-50 bg-white p-4 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
                >
                  <div className="flex gap-2 space-y-2 ">
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user?.Profile?.profile_pic} alt="@shadcn" />

                    </Avatar><div>
                      <h4 className='font-medium'>{user?.fullname}</h4>
                      <p className='text-sm text-muted-foreground'>{user?.Profile?.bio}</p>

                    </div>

                  </div>
                  <div className="flex flex-col items-start font-bold my-2 text-gray-600 space-y-2">
                  {
                          user && user.role == 'Student' &&(
                    <div className="flex w-full  font-bold items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button  className="w-full font-bold" variant="outline">
                    
                        <Link to="/Profile">  View Profile</Link>
                      </Button>
                    </div>
                       )
                      }

                    <div className="flex w-full  font-bold items-center gap-2 cursor-pointer">

                      <LogOut />
                      <Button onClick={logoutHandler} className="w-full font-bold" variant="outline" type="button">
                        Logout
                      </Button>
                    </div>

                  </div>
                </PopoverContent>
              </Popover>
            )
          }



        </div>

      </div>
    </div>
  )
}

export default Navbar
