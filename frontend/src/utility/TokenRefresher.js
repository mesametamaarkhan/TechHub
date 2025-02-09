import axios from 'axios';

const refreshAccessToken = async (navigate) => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
        console.warn('No refresh token found, user might need to log in again.');
        alert('Timeout!! Please log in again');
        navigate('/login');
        return;
    }
    
    try {
        const response = await axios.post('http://localhost:8080/user/refresh-token', { refreshToken });

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