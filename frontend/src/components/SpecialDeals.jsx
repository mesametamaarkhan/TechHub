import React from 'react';

const SpecialDeals = () => {
  return (
    <section className="py-12 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Special Deals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <div className="text-2xl font-bold mb-2">40% OFF</div>
            <p className="mb-4">On Selected Laptops</p>
            <div className="text-sm">Ends in: 2d 15h 30m</div>
          </div>
          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <div className="text-2xl font-bold mb-2">Free Shipping</div>
            <p className="mb-4">On Orders Above $999</p>
            <div className="text-sm">Limited Time Offer</div>
          </div>
          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <div className="text-2xl font-bold mb-2">Bundle Deal</div>
            <p className="mb-4">Phone + Accessories</p>
            <div className="text-sm">Save up to $200</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SpecialDeals;