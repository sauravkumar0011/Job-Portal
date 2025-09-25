import { setCompanies} from '@/redux/companySlice'
import { COMPANY_API_END_POINT} from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const config = {
                    withCredentials: true,
                };
                if (user && user.token) {
                    config.headers = { Authorization: `Bearer ${user.token}` };
                }
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, config);
                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchCompanies();
    }, [user]);
}

export default useGetAllCompanies