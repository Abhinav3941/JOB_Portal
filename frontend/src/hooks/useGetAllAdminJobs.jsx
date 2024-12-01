import { setAllAdminJobs} from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch} from 'react-redux'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    // const {searchedQuery} = useSelector(store=>store.job);
    useEffect(()=>{
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.log("the error is vbv" ,error);
            }
        }
        fetchAllAdminJobs();
    },[])
}

export default useGetAllAdminJobs