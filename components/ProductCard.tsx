
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const isBook = product.categoryId === 'sach' || product.categoryId === 'sách';
  const fallbackImage = 'https://images.unsplash.com/photo-1544648397-72fc8f6d83c6?q=80&w=400&auto=format&fit=crop';

  return (
    <div className="group relative flex flex-col bg-brand-dark/30 rounded-[2rem] border border-brand-cream/5 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-brand-accent/10 hover:-translate-y-2">
      <a 
        href={product.affiliateUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex flex-col h-full"
      >
        <div className={`relative overflow-hidden bg-brand-dark/20 ${isBook ? 'aspect-[3/4.5]' : 'aspect-[3/4]'}`}>
          <img 
            src={product.imageUrl || fallbackImage} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            onError={(e) => (e.currentTarget.src = fallbackImage)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {isBook && (
            <div className="absolute top-4 left-4 bg-brand-accent text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg transform -rotate-3 uppercase tracking-tighter">
              Bestseller
            </div>
          )}
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-base md:text-lg font-bold text-brand-beige mb-4 line-clamp-2 leading-tight group-hover:text-brand-accent transition-colors">
            {product.name}
          </h3>
          
          <div className="mt-auto">
            <div className="w-full bg-brand-accent/10 border border-brand-accent/20 group-hover:bg-brand-accent text-brand-accent group-hover:text-white font-black py-3 rounded-2xl text-center transition-all duration-300 uppercase tracking-widest text-xs">
              MUA NGAY
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default ProductCard;
