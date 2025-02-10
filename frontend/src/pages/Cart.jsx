import { useEffect, useState } from 'react';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import CheckoutModal from '../components/CheckoutModal';
import axios from 'axios';
import { useNavigate } from'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CartPage = () => {
    const [cart, setCart] = useState({});
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthentication = () => {
            const currentUser = localStorage.getItem('user');
            const token = localStorage.getItem('accessToken');

            if (!currentUser || !token) {
                navigate('/login'); // Redirect to login page if not logged in
            }
        };

        const fetchCart = async () => {
            const token = localStorage.getItem('accessToken');
            const user = JSON.parse(localStorage.getItem('user'));

            try {
                const res = await axios.get(`${API_BASE_URL}/cart/${user.id}`, 
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }   
                    }
                );

                if(res.status === 403) {
                    navigate('/login');
                }
                
                setCart(res.data.cart);
                setCartItems(res.data.cart.items);
            }
            catch(error) {
                console.log(error);
            }
        }

        checkAuthentication();
        fetchCart();
    }, []);

    const handleDeleteFromCart = async (productId) => {
        try {
            const token = localStorage.getItem('accessToken');
            const user = JSON.parse(localStorage.getItem('user'));

            const res = await axios.put(`${API_BASE_URL}/cart/delete-item/${productId}`, 
                {
                    userId: user.id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if(res.status === 200) {
                alert('Product removed from cart successfully');
                window.location.reload();
            }
            else if(res.status === 400) {
                alert('Product could not be removed from cart. Please try again later.');
            }
        }
        catch(error) {
            console.log(error);
        }
    }

    const updateQuantity = async (productId, add) => {
        try {
            const token = localStorage.getItem('accessToken');
            const user = JSON.parse(localStorage.getItem('user'));

            const res = await axios.put(`${API_BASE_URL}/cart/update-quantity/${productId}`, 
                {
                    userId: user.id,
                    add: add
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if(res.status === 200) {
                alert('Product quantity updated successfully');
                window.location.reload();
            }
            else if(res.status === 400) {
                alert('Cart could not be updated. Please try again later.');
            }
        }
        catch(error) {
            console.log(error);
        }
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 15.99;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    return (
        <>
            <div className="bg-dark-greenish-gray pt-20 container w-full min-h-screen max-w-screen-2xl mx-auto px-4 pb-8 ">
                <h1 className="text-3xl font-bold mb-8 text-white">Shopping Cart</h1>
            
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                    {cartItems.length === 0 ? (
                        <div className="text-center py-8 bg-black rounded-lg">
                            <p className="text-gray-300">Your cart is empty</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.productId} className="bg-black rounded-lg p-4 flex items-center gap-4">
                                    <img
                                        src={item.image}
                                        alt={item.productTitle}
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-white">{item.productTitle}</h3>
                                        <p className="text-green-400 font-bold">${item.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => updateQuantity(item.productId, 0)}
                                            className="p-1 hover:bg-gray-700 rounded"
                                        >
                                            <FiMinus className="text-gray-300" />
                                        </button>
                                        <span className="w-8 text-center text-gray-100">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.productId, 1)}
                                            className="p-1 hover:bg-gray-700 rounded"
                                        >
                                            <FiPlus className="text-gray-300" />
                                        </button>
                                    </div>
                                <button
                                    onClick={() => handleDeleteFromCart(item.productId)}
                                    className="p-2 hover:bg-gray-700 rounded"
                                >
                                    <FiTrash2 className="text-red-400" />
                                </button>
                                </div>
                            ))}
                        </div>
                    )}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-black rounded-lg p-6 h-fit">
                        <h2 className="text-xl font-bold mb-4 text-gray-100">Order Summary</h2>
                        <div className="space-y-3 text-gray-300">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>${shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <div className="border-t border-gray-700 pt-3">
                                <div className="flex justify-between font-bold text-gray-100">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsCheckoutModalOpen(true)}
                            className="w-full bg-green-600 text-white py-3 rounded-lg mt-6 hover:bg-green-700 transition-colors"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>

            <CheckoutModal
                isOpen={isCheckoutModalOpen}
                onClose={() => setIsCheckoutModalOpen(false)}
                total={total}
                tax={tax}
            />
        </>
    );
}

export default CartPage;