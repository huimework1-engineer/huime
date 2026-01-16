
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
      {/* Toàn bộ card có thể click được qua thẻ a bao ngoài các phần chính hoặc dùng a bao quanh toàn bộ */}
      <a 
        href={product.affiliateUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-brand-accent rounded-2xl overflow-hidden"
        aria-label={`Mua ngay ${displayTitle}`}
      >
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-brand-dark/10">
          <img 
            src={product.imageUrl || fallbackImage} 
            alt={displayTitle}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = fallbackImage;
            }}
          />
        </div>
        
        {/* Product Info */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-brand-beige mb-6 line-clamp-2 group-hover:text-brand-accent transition-colors leading-snug min-h-[3rem]">
            {displayTitle}
          </h3>
          
          {/* Action Button - Visually styled but the whole card is a link */}
          <div className="mt-auto pointer-events-none">
            <div className="w-full bg-brand-accent group-hover:bg-brand-accent/90 text-brand-cream font-bold py-3.5 px-4 rounded-xl text-center transition-all shadow-lg shadow-brand-accent/20 uppercase tracking-widest text-sm">
              Mua ngay
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default ProductCard;
