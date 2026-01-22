
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-brand-light/95 backdrop-blur-md border-b border-brand-cream/10 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <div 
          onClick={() => handleCategoryClick('all')} 
          className="cursor-pointer text-2xl font-bold tracking-tighter text-brand-beige hover:text-brand-accent transition-all flex items-center shrink-0"
        >
          <span className="text-brand-accent">.</span>{SITE_NAME}
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-1">
          <button 
            onClick={() => handleCategoryClick('all')}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === 'all' ? 'bg-brand-accent text-brand-cream' : 'text-brand-beige/70 hover:text-brand-accent'}`}
          >
            Trang chủ
          </button>
          <button 
            onClick={() => handleCategoryClick('sach')}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all flex items-center space-x-2 ${activeCategory === 'sach' ? 'bg-brand-accent text-brand-cream' : 'text-brand-beige/70 hover:text-brand-accent'}`}
          >
            <span>📚</span>
            <span>Tủ sách</span>
          </button>
        </nav>

        {/* Search */}
        <div className="flex-1 max-w-sm relative">
          <input
            type="text"
            placeholder="Tìm sản phẩm..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl border border-brand-cream/10 bg-brand-dark/20 focus:bg-brand-dark/40 focus:ring-2 focus:ring-brand-accent focus:outline-none text-sm text-brand-beige placeholder:text-brand-beige/30 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg className="absolute left-3 top-2.5 h-4 w-4 text-brand-beige/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-brand-beige"
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-brand-dark/95 border-b border-brand-cream/10 p-4 space-y-3 animate-in slide-in-from-top duration-300">
          <button 
            onClick={() => handleCategoryClick('all')}
            className={`w-full text-left p-3 rounded-xl font-bold ${activeCategory === 'all' ? 'bg-brand-accent text-brand-cream' : 'text-brand-beige/60'}`}
          >
            Trang chủ
          </button>
          <button 
            onClick={() => handleCategoryClick('sach')}
            className={`w-full text-left p-3 rounded-xl font-bold flex items-center space-x-2 ${activeCategory === 'sach' ? 'bg-brand-accent text-brand-cream' : 'text-brand-beige/60'}`}
          >
            <span>📚</span>
            <span>Tủ sách HUIME</span>
          </button>
          <div className="pt-2">
            <p className="text-[10px] font-black text-brand-beige/20 uppercase tracking-widest px-3 mb-2">Danh mục</p>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.filter(c => c.slug !== 'sach').map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className={`text-left p-3 rounded-xl text-sm font-bold ${activeCategory === cat.slug ? 'bg-brand-accent text-brand-cream' : 'bg-brand-light/10 text-brand-beige/60'}`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
