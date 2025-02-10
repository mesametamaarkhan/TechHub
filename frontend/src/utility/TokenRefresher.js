import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const refreshAccessToken = async (navigate) => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
        console.warn('No refresh token found, user might need to log in again.');
        alert('Timeout!! Please log in again');
        navigate('/login');
        return;
    }
    
    try {
        const response = await axios.post(`${API_BASE_URL}/user/refresh-token`, { refreshToken });

        if (response.status === 200) {
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
        }
    } 
    catch (error) {
        console.error('Error refreshing access token:', error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        navigate('/login');
    }
};

export default refreshAccessToken;