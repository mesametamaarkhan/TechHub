import React, { useState } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "iPhone 15 Pro",
      price: 999,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1696423736792-2d5be7ce4f7d",
    },
    {
      id: 2,
      name: "MacBook Pro M3",
      price: 1499,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    },
  ]);

  const shippingCost = 50;

  const handleQuantityChange = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + shippingCost;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Your Cart</h1>
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* Cart Items Section */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Cart Items</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  className="w-16 text-center border border-gray-300 rounded-md"
                  min="1"
                />
                <p className="ml-4 text-lg font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <p className="text-gray-600">Subtotal</p>
              <p className="text-gray-900 font-medium">${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Shipping Cost</p>
              <p className="text-gray-900 font-medium">${shippingCost.toFixed(2)}</p>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <p className="text-lg font-semibold">Total</p>
                <p className="text-lg font-semibold">${total.toFixed(2)}</p>
              </div>
            </div>
            <button
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
