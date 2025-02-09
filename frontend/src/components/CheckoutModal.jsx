import { useState } from "react";
import { FiX } from "react-icons/fi";
import axios from 'axios';

function CheckoutModal({ isOpen, onClose, total, tax }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    userId: "",
    shippingAddress: {
      addressLine1: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    tax: "",
    paymentMethod: "card",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prevFormData) => {
      if (name.includes(".")) {
        const [parent, child] = name.split(".");
        return {
          ...prevFormData,
          [parent]: {
            ...prevFormData[parent],
            [child]: value,
          },
        };
      }
  
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    const user = JSON.parse(localStorage.getItem('user'));

    try {
      formData.userId = user.id;
      formData.tax = tax;
      const response = await axios.post(`http://localhost:8080/orders/create-order`, formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 201) {
        alert("Order placed successfully!");
        onClose(); 
        window.location.reload();
      } 
      else {
        alert(`Error placing order`);
      }
    } 
    catch (error) {
      console.error("Checkout failed:", error);
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-100">Checkout</h2>
          <button onClick={onClose} className="text-green-400 hover:text-green-200">
            <FiX size={24} />
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Shipping Address */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-100">Shipping Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-gray-300 mb-2">Street Address</label>
                <input
                  type="text"
                  name="shippingAddress.addressLine1"
                  value={formData.shippingAddress.addressLine1}
                  onChange={handleChange}
                  className="w-full bg-dark-greenish-gray border border-white rounded-lg px-4 py-2 text-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">City</label>
                <input
                  type="text"
                  name="shippingAddress.city"
                  value={formData.shippingAddress.city}
                  onChange={handleChange}
                  className="w-full bg-dark-greenish-gray border border-white rounded-lg px-4 py-2 text-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">State</label>
                <input
                  type="text"
                  name="shippingAddress.state"
                  value={formData.shippingAddress.state}
                  onChange={handleChange}
                  className="w-full bg-dark-greenish-gray border border-white rounded-lg px-4 py-2 text-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Zip Code</label>
                <input
                  type="text"
                  name="shippingAddress.zipCode"
                  value={formData.shippingAddress.zipCode}
                  onChange={handleChange}
                  className="w-full bg-dark-greenish-gray border border-white rounded-lg px-4 py-2 text-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Country</label>
                <input
                  type="text"
                  name="shippingAddress.country"
                  value={formData.shippingAddress.country}
                  onChange={handleChange}
                  className="w-full bg-dark-greenish-gray border border-white rounded-lg px-4 py-2 text-gray-100"
                  required
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-100">Payment Method</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="card"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === "card"}
                  onChange={handleChange}
                  className="text-green-600"
                />
                <label htmlFor="card" className="text-gray-300">Credit/Debit Card</label>
              </div>

              {/* Card Details */}
              <div className="space-y-4 mt-4">
                <div>
                  <label className="block text-gray-300 mb-2">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="w-full bg-dark-greenish-gray border border-white rounded-lg px-4 py-2 text-gray-100"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      className="w-full bg-dark-greenish-gray border border-white rounded-lg px-4 py-2 text-gray-100"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      className="w-full bg-dark-greenish-gray border border-white rounded-lg px-4 py-2 text-gray-100"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Total */}
          <div className="border-t border-gray-700 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Total to Pay:</span>
              <span className="text-2xl font-bold text-green-400">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default CheckoutModal;
