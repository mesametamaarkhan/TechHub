import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import axios from 'axios';

const Profile = () => {
    const [openSection, setOpenSection] = useState('details');
    const [userDetails, setUserDetails] = useState(null);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthentication = () => {
            const currentUser = JSON.parse(localStorage.getItem('user'));
            const token = localStorage.getItem('accessToken');

            if (!currentUser || !token) {
                navigate('/login'); // Redirect to login page if not logged in
            }
        };

        const fetchUserDetails = async () => {
            const currentUser = JSON.parse(localStorage.getItem('user'));
            const token = localStorage.getItem('accessToken');

            try {
                const response = await axios.get(`http://localhost:8080/user/profile-page/${currentUser.id}`, 
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if(response.status === 403) {
                    navigate('/login');
                }
                setUserDetails(response.data.user);
            } 
            catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        const fetchOrderHistory = async () => {
            const currentUser = JSON.parse(localStorage.getItem('user'));
            const token = localStorage.getItem('accessToken');

            try {
                const response = await axios.get(`http://localhost:8080/orders/${currentUser.id}`, 
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if(response.status === 403) {
                    navigate('/login');
                }
                setOrders(response.data.orders);
            } 
            catch (error) {
                console.error('Error fetching order history:', error);
            }
        };

        checkAuthentication();
        fetchUserDetails();
        fetchOrderHistory();
    }, []);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('accessToken');
            const res = await axios.put(`http://localhost:8080/user/update-profile/${userDetails._id}`, userDetails,
                {
                    headers: {
                        Authentication: `Bearer ${token}`
                    }
                }
            );

            if(res.status === 201) {
                alert('User updated successfully');
                window.location.reload();
            }
            else {
                alert('There was an error when updating the profile. Please try again later.');
            }
        } 
        catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
    
        const currentPassword = e.target.currentPassword.value;
        const newPassword = e.target.newPassword.value;
        const confirmPassword = e.target.confirmPassword.value;
    
        if (!currentPassword || !newPassword || !confirmPassword) {
            alert("Please fill in all password fields.");
            return;
        }
    
        if (newPassword !== confirmPassword) {
            alert("New passwords do not match.");
            return;
        }
    
        try {
            const token = localStorage.getItem("accessToken");
            const currentUser = JSON.parse(localStorage.getItem("user"));
    
            const response = await axios.post(
                `http://localhost:8080/user/reset-password/${currentUser.id}`,
                { 
                    password: currentPassword, 
                    newPassword 
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            if (response.status === 200) {
                alert("Password updated successfully!");
                e.target.reset(); 
            } 
            else {
                alert("Error updating password. Please try again.");
            }
        } 
        catch (error) {
            console.error("Error updating password:", error);
            alert(error.response?.data?.message || "An error occurred while updating your password.");
        }
    };
    

    if (!userDetails) {
        return <div className="text-white text-center pt-24">Loading...</div>;
    }

    return (
        <div className="bg-dark-greenish-gray pt-24 container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-100">My Profile</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* Profile Details Section */}
                    <div className="bg-black rounded-lg shadow-lg overflow-hidden">
                        <button
                            className="w-full px-6 py-4 flex items-center justify-between text-left"
                            onClick={() => toggleSection('details')}
                        >
                            <h2 className="text-xl font-semibold text-gray-100">Profile Details</h2>
                            {openSection === 'details' ? (
                                <FiChevronUp className="text-gray-400" />
                            ) : (
                                <FiChevronDown className="text-gray-400" />
                            )}
                        </button>
                        {openSection === 'details' && (
                        <div className="px-6 pb-6">
                            <form onSubmit={handleUpdateProfile} className="space-y-4">
                                <div>
                                    <label className="block text-gray-300 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        value={userDetails.name}
                                        onChange={(e) => setUserDetails({...userDetails, name: e.target.value})}
                                        className="w-full bg-dark-greenish-gray border border-white rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={userDetails.email}
                                        onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
                                        className="w-full bg-dark-greenish-gray border border-white rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        value={userDetails.phone}
                                        onChange={(e) => setUserDetails({...userDetails, phone: e.target.value})}
                                        className="w-full bg-dark-greenish-gray border border-white rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Update Profile
                                </button>
                            </form>
                        </div>
                        )}
                    </div>

                    {/* Change Password Section */}
                    <div className="bg-black rounded-lg shadow-lg overflow-hidden">
                        <button
                            className="w-full px-6 py-4 flex items-center justify-between text-left"
                            onClick={() => toggleSection('password')}
                        >
                            <h2 className="text-xl font-semibold text-gray-100">Change Password</h2>
                            {openSection === 'password' ? (
                                <FiChevronUp className="text-gray-400" />
                            ) : (
                                <FiChevronDown className="text-gray-400" />
                            )}
                        </button>
                        {openSection === 'password' && (
                        <div className="px-6 pb-6">
                            <form onSubmit={handleUpdatePassword} className="space-y-4">
                                <div>
                                    <label className="block text-gray-300 mb-2">Current Password</label>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        className="w-full bg-dark-greenish-gray border border-white rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2">New Password</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        className="w-full bg-dark-greenish-gray border border-white rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2">Confirm New Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        className="w-full bg-dark-greenish-gray border border-white rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Update Password
                                </button>
                            </form>
                        </div>
                        )}
                    </div>
                </div>

                {/* Order History Section */}
                <div className="lg:col-span-1">
                    <div className="bg-black rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-6 text-gray-100">Order History</h2>
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div key={order._id} className="border border-green-700 rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="text-green-400 font-semibold">{order._id}</p>
                                            <p className="text-gray-400 text-sm">{new Date(order.createdAt).toISOString().split('T')[0]}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm ${
                                            order.status === 'Delivered' 
                                                ? 'bg-green-900 text-green-200' 
                                                : 'bg-yellow-900 text-yellow-200'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="space-y-2">
                                        {order.items.map((item, index) => (
                                        <div key={index} className="flex justify-between text-gray-300 text-sm">
                                            <span>{item.quantity}x {item.productTitle}</span>
                                            <span>${item.price.toFixed(2)}</span>
                                        </div>
                                        ))}
                                    </div>
                                    <div className="border-t border-gray-700 mt-4 pt-4 flex justify-between">
                                        <span className="text-gray-300">Total</span>
                                        <span className="text-green-400 font-bold">${order.totalAmount.toFixed(2)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;