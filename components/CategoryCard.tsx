
import React from 'react';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  isActive: boolean;
  onClick: (slug: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, isActive, onClick }) => {
  return (
    <button
      onClick={() => onClick(category.slug)}
      className={`flex flex-col items-center p-4 rounded-2xl border transition-all duration-300 ${
        isActive 
          ? 'bg-brand-accent border-brand-accent text-brand-cream shadow-xl scale-105' 
          : 'bg-brand-dark/20 border-brand-cream/10 text-brand-beige/70 hover:border-brand-accent/50 hover:bg-brand-dark/30 hover:shadow-md'
      }`}
    >
      <span className="text-2xl mb-1">{category.icon}</span>
      <span className="text-xs font-bold uppercase tracking-tight whitespace-nowrap">{category.name}</span>
    </button>
  );
};

export default CategoryCard;
