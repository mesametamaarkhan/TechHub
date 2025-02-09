import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import refreshAccessToken from './TokenRefresher.js';

const useTokenRefresher = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const excludedPaths = ['/login', '/signup'];

    useEffect(() => {
        if (excludedPaths.includes(location.pathname)) return;

        const refreshInterval = setInterval(() => {
            refreshAccessToken(navigate);
        }, 15 * 60 * 1000); // 15 minutes

        return () => clearInterval(refreshInterval);
    }, [location.pathname, navigate]);
};

export default useTokenRefresher;
