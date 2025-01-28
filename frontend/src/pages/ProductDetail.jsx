import React from 'react'
import { ChevronLeft, ChevronRight, Plus, Star } from 'lucide-react'
import ProductCard from '../components/ProductCard';

const ProductDetail = () => {

    const [activeTab, setActiveTab] = React.useState('description');
    const [activeImage, setActiveImage] = React.useState(0);

    const product = {
        id: 1,
        name: "MacBook Pro M3",
        price: 1499,
        rating: 4.8,
        images: [
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
          "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9",
          "https://images.unsplash.com/photo-1541807084-5c52b6b3adef",
          "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0"
        ],
        shortDescription: "The most powerful MacBook Pro ever is here. With the blazing-fast M3 chip, stunning Liquid Retina XDR display, and up to 20 hours of battery life.",
        features: [
          "Apple M3 Pro chip",
          "16-inch Liquid Retina XDR display",
          "Up to 20 hours battery life",
          "1080p FaceTime HD camera",
          "Six-speaker sound system"
        ],
        compatibility: "Compatible with all iPhone and iPad apps",
        fullDescription: "Experience the ultimate in performance with the new MacBook Pro. The M3 chip delivers exceptional speed and efficiency, while the stunning Liquid Retina XDR display brings your content to life with extreme dynamic range and incredible detail.",
        specs: {
          processor: "Apple M3 Pro chip",
          memory: "16GB unified memory",
          storage: "512GB SSD",
          display: "16-inch Liquid Retina XDR display",
          battery: "100-watt-hour lithium-polymer battery",
          ports: "3 Thunderbolt 4 ports, HDMI port, SDXC card slot"
        },
        reviews: [
          {
            id: 1,
            user: "John D.",
            rating: 5,
            date: "2024-02-15",
            comment: "Best laptop I've ever owned. The performance is incredible."
          },
          {
            id: 2,
            user: "Sarah M.",
            rating: 4,
            date: "2024-02-10",
            comment: "Great machine, but the price is steep."
          }
        ]
    };

    const recommendedProducts = [
        {
          id: 2,
          name: "Magic Keyboard",
          price: 299,
          image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
          category: "Accessories",
          rating: 4.6
        },
        {
          id: 3,
          name: "AirPods Pro",
          price: 249,
          image: "https://images.unsplash.com/photo-1588156979435-379b9d365296",
          category: "Accessories",
          rating: 4.7
        },
        {
          id: 4,
          name: "iPad Pro",
          price: 799,
          image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
          category: "Tablets",
          rating: 4.8
        }
    ];

    const nextImage = () => {
        setActiveImage((prev) => (prev + 1) % product.images.length);
    };

    const prevImage = () => {
        setActiveImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    return (
        <div className='container mx-auto px-4 mt-12'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-12'>
                <div className='relative'>
                    <div className='aspect-square overflow-hidden rounded-lg bg-gray-100'>
                        <img
                            src={product.images[activeImage]}
                            alt={product.name}
                            className='w-full h-full object-center object-cover'
                        />
                        <button
                            onClick={prevImage}
                            className='absolute top-1/2 left-4 -translate-y-2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white hover:bg-opacity-70 transition-colors'
                        >
                            <ChevronLeft className='w-6 h-6 text-black' />
                        </button>
                        <button 
                            onClick={nextImage}
                            className='absolute top-1/2 right-4 -translate-y-2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white hover:bg-opacity-70 transition-colors'
                        >
                            <ChevronRight className='w-6 h-6 text-black' />
                        </button>
                    </div>
                    <div className='flex mt-4 space-x-4'>
                        {product.images.map((image, index) => (
                            <button 
                                key={index} 
                                onClick={() => setActiveImage(index)}
                                className={`w-20 h-20 rounded-lg overflow-hidden ${activeImage === index ? 'ring-2 ring-blue-500' : ''}`}
                            >
                                <img
                                    key={index}
                                    src={image}
                                    alt=''
                                    className='w-full h-full object-cover border border-gray-200 cursor-pointer'
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <h1 className='text-3xl font-bold text-black mb-4'>{product.name}</h1>
                    <div className='flex items-center mb-4'>
                        <div className='flex mr-2'>
                            <Star className='w-6 h-6 text-yellow-400' />
                        </div>
                        <span className='text-lg text-black'>{product.rating}</span>
                    </div>
                    <p className='text-3xl text-black mb-4'>${product.price}</p>
                    <p className='text-black b-6'></p>

                    <div className='mb-6'>
                        <h3 className='text font-semibold text-black mb-2'>Features</h3>  
                        <ul className='space-y-2'>
                            {product.features.map((feature, index) => (
                                <li key={index} className='flex items-center text-black'>
                                    <Plus className='w-4 h-4 mr-2' />
                                    {feature}
                                </li>
                            ))}
                        </ul>  
                    </div>

                    <p className='text-black mb-6'>{product.compatibility}</p>

                    <button className='w-full bg-black text-white py-3 px-6 rounded-full font-semibold hover:bg-gray-600 transition-colors'>
                        Add to Cart
                    </button>
                </div>
            </div>

            <div className='mb-12'>
                <div className='border-b border-gray-200 mb-6'>
                    <div className='flex space-x-8'>
                        <button 
                            onClick={() => setActiveTab('description')}
                            className={`py-4 text-sm font-medium ${activeTab === 'description' ? 'text-black border-b-2 border-black' : 'text-gray-600'}`}
                        >
                            Description
                        </button>
                        <button 
                            onClick={() => setActiveTab('specifications')}
                            className={`py-4 text-sm font-medium ${activeTab === 'specifications' ? 'text-black border-b-2 border-black' : 'text-gray-600'}`}
                        >
                            Specifications
                        </button>
                        <button 
                            onClick={() => setActiveTab('reviews')}
                            className={`py-4 text-sm font-medium ${activeTab === 'reviews' ? 'text-black border-b-2 border-black' : 'text-gray-600'}`}
                        >
                            Reviews
                        </button>
                    </div>
                </div>

                <div className='py-6'>
                    {activeTab === 'description' && (
                        <div className='prose max-w-none'>
                            <p className='text-black'>{product.fullDescription}</p>
                        </div>
                    )}

                    {activeTab === 'specifications' && (
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            {Object.entries(product.specs).map(([key, value]) => (
                                <div key={key} className='border-b border-gray-200 pb-4'>
                                    <dt className='font-medium text-black mb-1 capitalize'>{key}</dt>
                                    <dd className='text-black'>{value}</dd>
                                </div>
                            ))}
                        </div>        
                    )}

                    {activeTab === 'reviews' && (
                        <div className='space-y-6'>
                            {
                                product.reviews.map((review) => (
                                    <div key={review.id} className='border-b border-gray-200 pb-6'>
                                        <div className='flex items-center mb-2'>
                                            <div className='flex mr-2'>
                                                <Star className='w-6 h-6 text-yellow-400 fill-current' />
                                                <span className='text-lg text-black'>{review.rating}</span>
                                            </div>
                                            <span className='font-medium text-black'>{review.user}</span>
                                            <span className='mx-2'>•</span>
                                            <span className="text-gray-600">{review.date}</span>
                                        </div>
                                        <p className='text-black'>{review.comment}</p>
                                    </div>
                                ))
                            }
                        </div>
                    )}
                </div>
            </div>
            
            <section className='py-16 bg-white'>
                <div className='container mx-auto px-4'>
                    <h2 className='text-3xl font-bold text-black mb-8 text-center'>Recommended Products</h2>
                    <div className='relative'>
                        <div className='flex justify-center space-x-6 overflow-x-auto pb-4'>
                            {recommendedProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ProductDetail