import { useSearchParams } from 'react-router-dom';

function useSearchParam() {
    const [searchParam, setSearchParam] = useSearchParams();
    const updateSearchParam = (filter) => {
        setSearchParam((prev) => {
            for (const [key, value] of Object.entries(filter)) {
                if (value === '') {
                    prev.delete(key);
                } else {
                    prev.set(key, value);
                }
            }
            return prev;
        });
    };
    return [searchParam, updateSearchParam];
}
export default useSearchParam;
