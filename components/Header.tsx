
import React, { useState } from 'react';
import { SITE_NAME, CATEGORIES } from '../constants';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  activeCategory: string;
  setActiveCategory: (val: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm, activeCategory, setActiveCategory }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCategoryClick = (slug: string) => {
    setActiveCategory(slug);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-brand-light/95 backdrop-blur-md border-b border-brand-cream/10 shadow-lg">
      <div className="container mx-auto px-4 py-3 md:py-4 flex flex-wrap items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => {handleCategoryClick('all'); setSearchTerm(''); window.scrollTo({top: 0, behavior: 'smooth'});}} 
          className="cursor-pointer text-2xl font-bold tracking-tight text-brand-beige hover:text-brand-accent transition-colors flex items-center"
        >
          <span className="text-brand-accent mr-1">.</span>{SITE_NAME}
        </div>

        {/* Mobile: Hamburger */}
        <div className="flex items-center space-x-3 md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-brand-beige focus:outline-none"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 items-center ml-10">
          <button 
            onClick={() => handleCategoryClick('all')}
            className={`text-sm font-semibold transition-colors ${activeCategory === 'all' ? 'text-brand-accent' : 'text-brand-beige/80 hover:text-brand-accent'}`}
          >
            Trang chủ
          </button>
          <button 
            onClick={() => handleCategoryClick('sach')}
            className={`text-sm font-semibold transition-colors flex items-center space-x-1 ${activeCategory === 'sach' ? 'text-brand-accent' : 'text-brand-beige/80 hover:text-brand-accent'}`}
          >
            <span>📚</span>
            <span>Tủ sách</span>
          </button>
          <div className="h-4 w-px bg-brand-cream/10"></div>
          {CATEGORIES.filter(c => c.slug !== 'sach').map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.slug)}
              className={`text-sm font-semibold transition-colors ${activeCategory === cat.slug ? 'text-brand-accent' : 'text-brand-beige/80 hover:text-brand-accent'}`}
            >
              {cat.name}
            </button>
          ))}
        </nav>

        {/* Search Bar */}
        <div className="w-full mt-3 md:mt-0 md:w-64 md:ml-auto">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-brand-beige/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </span>
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="block w-full pl-10 pr-3 py-2 border border-brand-cream/10 rounded-lg bg-brand-dark/20 focus:bg-brand-dark/40 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent text-sm transition-all text-brand-beige placeholder:text-brand-beige/40"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {isMenuOpen && (
          <div className="w-full md:hidden mt-4 pt-4 border-t border-brand-cream/10 flex flex-col space-y-2">
            <button 
              onClick={() => handleCategoryClick('all')}
              className={`text-left text-base font-semibold p-3 rounded-xl ${activeCategory === 'all' ? 'bg-brand-accent text-brand-cream' : 'text-brand-beige/80 bg-brand-dark/20'}`}
            >
              Trang chủ
            </button>
            <button 
              onClick={() => handleCategoryClick('sach')}
              className={`text-left text-base font-semibold p-3 rounded-xl flex items-center space-x-2 ${activeCategory === 'sach' ? 'bg-brand-accent text-brand-cream' : 'text-brand-beige/80 bg-brand-dark/20'}`}
            >
              <span>📚</span>
              <span>Tủ sách của HUIME</span>
            </button>
            <div className="py-2 px-1 text-[10px] font-bold text-brand-beige/30 uppercase tracking-widest">Danh mục khác</div>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.filter(c => c.slug !== 'sach').map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className={`text-left text-sm font-semibold p-3 rounded-xl ${activeCategory === cat.slug ? 'bg-brand-accent text-brand-cream' : 'text-brand-beige/80 bg-brand-dark/20'}`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
