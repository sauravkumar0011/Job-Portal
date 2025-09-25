import { setAllAdminJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);
    useEffect(()=>{
        const fetchAllAdminJobs = async () => {
            try {
                const config = {
                    withCredentials: true,
                };
                if (user && user.token) {
                    config.headers = { Authorization: `Bearer ${user.token}` };
                }
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, config);
                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAdminJobs();
    },[])
}

export default useGetAllAdminJobs