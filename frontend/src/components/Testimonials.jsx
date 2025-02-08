import React from 'react';
import { FiStar } from 'react-icons/fi';

const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    comment: 'Great selection of products and excellent customer service!',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 2,
    name: 'Jane Smith',
    comment: 'Fast shipping and competitive prices. Highly recommended!',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  // Add more testimonials as needed
];

const Testimonials = () => {
  return (
    <section className="py-12 bg-dark-greenish-gray">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-black p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-white">{testimonial.name}</h3>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FiStar key={i} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-white">{testimonial.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;