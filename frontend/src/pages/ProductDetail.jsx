import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Plus, Star } from 'lucide-react'
import ProductCard from '../components/ProductCard';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const ProductDetail = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('description');
    const [activeImage, setActiveImage] = useState(0);
    const [product, setProduct] = useState({});
    const [recommendedProducts, setRecommendedProducts] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/products/${id}`);
                setProduct(res.data.product);
                setRecommendedProducts(res.data.recommendedProducts);
            }
            catch(error) {
                console.log(error);
            }
        }
        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const user = JSON.parse(localStorage.getItem('user'));
            
            const res = await axios.put(`http://localhost:8080/cart/add-to-cart`, 
                {
                    userId: user.id,
                    productId: id,
                    quantity: 1,
                    price: product.price,
                    productTitle: product.title,
                    productImage: product.images[0],
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if(res.status === 200) {
                alert('Product added to cart successfully');
            }
            else if(res.status === 400) {
                alert('Product could not be added to cart. Please try again later');
            }
        }
        catch(error) {
            console.log(error);
        }
    };

    const nextImage = () => {
        setActiveImage((prev) => (prev + 1) % product.images.length);
    };

    const prevImage = () => {
        setActiveImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    if (!product) return <div>Loading...</div>;
    if (!product || !product.images) return <div>Product not found</div>;

    return (
        <div className='container mx-auto px-4 mt-12 bg-dark-greenish-gray'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 mt-12'>
                <div className='relative'>
                    <div className='aspect-square overflow-hidden rounded-lg bg-dark-greenish-gray'>
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
                                className={`w-20 h-20 rounded-lg overflow-hidden ${activeImage === index ? 'ring-2 ring-green-500' : ''}`}
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
                    <h1 className='text-3xl font-bold text-white mb-4'>{product.title}</h1>
                    <div className='flex items-center mb-4'>
                        <div className='flex mr-2'>
                            <Star className='w-6 h-6 text-yellow-400' />
                        </div>
                        <span className='text-lg text-white'>{product.rating}</span>
                    </div>
                    <p className='text-3xl text-white mb-4'>${product.price}</p>
                    <p className='text-black b-6'></p>

                    <div className='mb-6'>
                        <h3 className='text font-semibold text-white mb-2'>Features</h3>  
                        <ul className='space-y-2'>
                            {product.features.map((feature, index) => (
                                <li key={index} className='flex items-center text-white'>
                                    <Plus className='w-4 h-4 mr-2 text-green-400' />
                                    {feature}
                                </li>
                            ))}
                        </ul>  
                    </div>

                    <p className='text-black mb-6'>{product.compatibility}</p>

                    <button 
                        onClick={() => handleAddToCart()}
                        className='w-full bg-green-500 text-white py-3 px-6 rounded-full font-semibold hover:bg-green-600 transition-colors'
                        >
                        Add to Cart
                    </button>
                </div>
            </div>

            <div className='mb-12'>
                <div className='border-b border-gray-700 mb-6'>
                    <div className='flex space-x-8'>
                        <button 
                            onClick={() => setActiveTab('description')}
                            className={`py-4 text-sm font-medium ${activeTab === 'description' ? 'text-green-500 border-b-2 border-green-500' : 'text-gray-400'}`}
                        >
                            Description
                        </button>
                        <button 
                            onClick={() => setActiveTab('specifications')}
                            className={`py-4 text-sm font-medium ${activeTab === 'specifications' ? 'text-green-500 border-b-2 border-green-500' : 'text-gray-400'}`}
                        >
                            Specifications
                        </button>
                        <button 
                            onClick={() => setActiveTab('reviews')}
                            className={`py-4 text-sm font-medium ${activeTab === 'reviews' ? 'text-green-500 border-b-2 border-green-500' : 'text-gray-400'}`}
                        >
                            Reviews
                        </button>
                    </div>
                </div>

                <div className='py-6'>
                    {activeTab === 'description' && (
                        <div className='prose max-w-none'>
                            <p className='text-white'>{product.fullDescription}</p>
                        </div>
                    )}

                    {activeTab === 'specifications' && (
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            {Object.entries(product.specs).map(([key, value]) => (
                                <div key={key} className='border-b border-green-400 pb-4'>
                                    <dt className='font-medium text-green-400 mb-1 capitalize'>{key}</dt>
                                    <dd className='text-white'>{value}</dd>
                                </div>
                            ))}
                        </div>        
                    )}

                    {activeTab === 'reviews' && (
                        <div className='space-y-6'>
                            {
                                product.reviews.map((review) => (
                                    <div key={review.id} className='border-b border-green-400 pb-6'>
                                        <div className='flex items-center mb-2'>
                                            <div className='flex mr-2'>
                                                <Star className='w-6 h-6 text-yellow-400 fill-current' />
                                                <span className='text-lg text-white'>{review.rating}</span>
                                            </div>
                                            <span className='font-medium text-green'>{review.user}</span>
                                            <span className='mx-2'>•</span>
                                            <span className="text-white">{review.date}</span>
                                        </div>
                                        <p className='text-black'>{review.comment}</p>
                                    </div>
                                ))
                            }
                        </div>
                    )}
                </div>
            </div>
            
            <section className='py-16 bg-dark-greenish-gray'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recommendedProducts.map((product, index) => (
                        <motion.div
                            key={index}
                            className="bg-black rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
                        >
                            <ProductCard key={index} product={product} />
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default ProductDetail