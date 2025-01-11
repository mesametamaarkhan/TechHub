import React from 'react';

const CategoryCard = ({ name, image, count }) => {
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg">
      <div className="h-64 overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
        <h3 className="text-xl font-bold text-white">{name}</h3>
        <p className="text-gray-200 mt-1">{count}</p>
        <button className="mt-4 bg-white text-blue-900 px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors">
          View All
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;