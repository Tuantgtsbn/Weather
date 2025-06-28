import { useState } from 'react';

function useQuery(initialQuery) {
    const [query, setQuery] = useState(initialQuery);
    const updateQuery = (newQuery) => {
        setQuery((prev) => ({
            ...prev,
            ...newQuery
        }));
    };
    const resetQuery = () => {
        setQuery(initialQuery);
    };
    return [query, updateQuery, resetQuery];
}

export default useQuery;
