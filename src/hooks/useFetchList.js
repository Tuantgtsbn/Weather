import axiosClient from '@/api/axiosClient';
import { useEffect, useState } from 'react';
const useFetchList = (path, query, config) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { page, ...otherQuery } = query;
    const newQuery = {
        ...otherQuery,
        skip: (page - 1) * query.limit
    };
    useEffect(() => {
        const fetchAPI = async () => {
            try {
                setLoading(true);
                const queryString = new URLSearchParams(newQuery).toString();
                const res = await axiosClient.get(`${path}?${queryString}`, config);
                setData(res.data);
            } catch (err) {
                console.log('Loi khi goi api', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(query), JSON.stringify(config), path]);
    return [data, loading];
};
export default useFetchList;
