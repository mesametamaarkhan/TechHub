import React from 'react'
import { Star } from 'lucide-react'

const ProductCard = ({ product }) => {
    return (
        <div className='bg-white text-black shadow-md rounded-lg p-4'>
            <img src={product.image} alt='Product' className='w-full h-48 object-cover' />
            <h2 className='text-xl font-semibold mt-4'>{product.name}</h2>
            <h3 className='text-lg font-medium mt-2'>{product.description}</h3>
            <div className='flex items-center'>
                <Star className='h-5 w-5 text-yellow-500 fill-current' />
                <span className='ml-2'>{product.rating}</span>
            </div>
            <div className='flex justify-between items-center'>
                <span className='text-lg font-semibold'>{product.price}</span>
                <button className='bg-black text-white px-4 py-2 rounded-md'>Add to Cart</button>
            </div>
        </div>
    )
}

export default ProductCard;