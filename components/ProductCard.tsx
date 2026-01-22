
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const fallbackImage = 'https://via.placeholder.com/400x400?text=HUIME+Product';
  const displayTitle = product.name || 'Xem sản phẩm';

  return (
    <div className="bg-brand-dark/20 backdrop-blur-sm rounded-2xl border border-brand-cream/5 overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <a 
        href={product.affiliateUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-brand-accent rounded-2xl overflow-hidden"
        aria-label={`Mua ngay ${displayTitle}`}
      >
        {/* Product Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-brand-dark/10">
          <img 
            src={product.imageUrl || fallbackImage} 
            alt={displayTitle}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = fallbackImage;
            }}
          />
          {/* Badge for Book Category if needed - logic could be added here */}
        </div>
        
        {/* Product Info */}
        <div className="p-3 md:p-5 flex-1 flex flex-col">
          <h3 className="text-sm md:text-lg font-bold text-brand-beige mb-3 md:mb-6 line-clamp-2 group-hover:text-brand-accent transition-colors leading-tight min-h-[2.5rem] md:min-h-[3rem]">
            {displayTitle}
          </h3>
          
          <div className="mt-auto pointer-events-none">
            <div className="w-full bg-brand-accent group-hover:bg-brand-accent/90 text-brand-cream font-bold py-2 md:py-3.5 px-2 rounded-xl text-center transition-all shadow-lg shadow-brand-accent/20 uppercase tracking-widest text-[10px] md:text-sm">
              Xem ngay
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default ProductCard;
