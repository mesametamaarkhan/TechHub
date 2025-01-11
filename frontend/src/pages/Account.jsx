import React, { useState } from 'react';

const Account = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(true);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleToggleProfile = () => setIsProfileOpen(!isProfileOpen);
  const handleToggleOrders = () => setIsOrdersOpen(!isOrdersOpen);
  
  const openEditProfileModal = () => setIsEditProfileModalOpen(true);
  const closeEditProfileModal = () => setIsEditProfileModalOpen(false);

  const openChangePasswordModal = () => setIsChangePasswordModalOpen(true);
  const closeChangePasswordModal = () => setIsChangePasswordModalOpen(false);

  const handleOrderClick = (order) => setSelectedOrder(order);

  const pastOrders = [
    {
      id: 1,
      date: "2024-01-10",
      total: 1999,
      items: [
        { name: "iPhone 15 Pro", quantity: 1, price: 999 },
        { name: "MacBook Pro M3", quantity: 1, price: 1499 }
      ]
    },
    {
      id: 2,
      date: "2023-12-22",
      total: 249,
      items: [{ name: "AirPods Pro", quantity: 1, price: 249 }]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">User Account</h1>

      {/* Profile View */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div
          className="cursor-pointer flex justify-between items-center p-4"
          onClick={handleToggleProfile}
        >
          <h2 className="text-2xl font-semibold">Profile</h2>
          <button className="text-gray-500">{isProfileOpen ? '-' : '+'}</button>
        </div>
        {isProfileOpen && (
          <div className="p-4 border-t border-gray-200">
            <p><strong>Name:</strong> John Doe</p>
            <p><strong>Email:</strong> john.doe@example.com</p>
            <p><strong>Phone:</strong> (555) 123-4567</p>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={openEditProfileModal}
                className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 transition-colors"
              >
                Edit Profile
              </button>
              <button
                onClick={openChangePasswordModal}
                className="bg-green-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-700 transition-colors"
              >
                Change Password
              </button>
              <button className="bg-red-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-700 transition-colors">
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Past Orders */}
      <div className="bg-white rounded-lg shadow-md">
        <div
          className="cursor-pointer flex justify-between items-center p-4"
          onClick={handleToggleOrders}
        >
          <h2 className="text-2xl font-semibold">Past Orders</h2>
          <button className="text-gray-500">{isOrdersOpen ? '-' : '+'}</button>
        </div>
        {isOrdersOpen && (
          <div className="p-4 border-t border-gray-200">
            {pastOrders.length === 0 ? (
              <p className="text-gray-600">No past orders found.</p>
            ) : (
              <div className="space-y-4">
                {pastOrders.map((order) => (
                  <div
                    key={order.id}
                    className="border p-4 rounded-md cursor-pointer hover:bg-gray-100"
                    onClick={() => handleOrderClick(order)}
                  >
                    <p className="font-semibold">Order Date: {order.date}</p>
                    <p className="font-semibold">Total: ${order.total.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {isEditProfileModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <form>
              <label className="block mb-2">Name</label>
              <input
                type="text"
                defaultValue="John Doe"
                className="w-full p-2 border rounded mb-4"
              />
              <label className="block mb-2">Email</label>
              <input
                type="email"
                defaultValue="john.doe@example.com"
                className="w-full p-2 border rounded mb-4"
              />
              <label className="block mb-2">Phone</label>
              <input
                type="text"
                defaultValue="(555) 123-4567"
                className="w-full p-2 border rounded mb-4"
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeEditProfileModal}
                  className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {isChangePasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Change Password</h2>
            <form>
              <label className="block mb-2">Current Password</label>
              <input
                type="password"
                className="w-full p-2 border rounded mb-4"
              />
              <label className="block mb-2">New Password</label>
              <input
                type="password"
                className="w-full p-2 border rounded mb-4"
              />
              <label className="block mb-2">Confirm New Password</label>
              <input
                type="password"
                className="w-full p-2 border rounded mb-4"
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeChangePasswordModal}
                  className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Selected Order Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <p><strong>Order Date:</strong> {selectedOrder.date}</p>
            <p><strong>Total:</strong> ${selectedOrder.total.toFixed(2)}</p>
            <ul className="mt-4">
              {selectedOrder.items.map((item, index) => (
                <li key={index} className="mb-2">
                  {item.name} x{item.quantity} - ${item.price.toFixed(2)}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;
