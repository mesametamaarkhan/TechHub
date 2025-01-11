import React from 'react';

const CategoryCard = ({ title, description, image }) => {
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg">
      <div className="h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <button className="mt-4 bg-white text-blue-900 px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors">
          View All
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;