
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryCard from './components/CategoryCard';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import { CATEGORIES, SHEET_CSV_URL } from './constants';
import { Product } from './types';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const parseCSV = (text: string): string[][] => {
    const rows: string[][] = [];
    let currentRow: string[] = [];
    let currentCell = '';
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          currentCell += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        currentRow.push(currentCell.trim());
        currentCell = '';
      } else if ((char === '\r' || char === '\n') && !inQuotes) {
        if (currentCell || currentRow.length > 0) {
          currentRow.push(currentCell.trim());
          rows.push(currentRow);
        }
        currentRow = [];
        currentCell = '';
        if (char === '\r' && nextChar === '\n') i++;
      } else {
        currentCell += char;
      }
    }
    if (currentCell || currentRow.length > 0) {
      currentRow.push(currentCell.trim());
      rows.push(currentRow);
    }
    return rows;
  };

  useEffect(() => {
    const fetchSheetData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(SHEET_CSV_URL);
        const csvText = await response.text();
        
        const rows = parseCSV(csvText);
        const dataRows = rows.slice(1); 
        
        const mappedProducts: Product[] = dataRows
          .filter(row => (row[1] && row[1].trim() !== '') || (row[3] && row[3].trim() !== '')) 
          .map((row, index) => {
            return {
              id: `sheet-${index}`,
              categoryId: row[0] ? row[0].toString().trim() : 'all',
              affiliateUrl: row[1] || '#',
              imageUrl: row[2] || '',
              name: row[3] || 'Xem sản phẩm',
              description: '',
            };
          });

        setProducts(mappedProducts);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu từ Google Sheets:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSheetData();
  }, []);

  const scrollToProducts = useCallback(() => {
    setTimeout(() => {
      const element = document.getElementById('product-list');
      if (element) {
        const offset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 150);
  }, []);

  const handleCategoryChange = useCallback((slug: string) => {
    setActiveCategory(slug);
    if (slug !== 'all') {
      scrollToProducts();
    }
  }, [scrollToProducts]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const categoryObj = CATEGORIES.find(c => c.slug === activeCategory);
      // Logic matching: checks slug or exact category name from Google Sheet
      const matchesCategory = activeCategory === 'all' || 
                              product.categoryId.toLowerCase() === activeCategory.toLowerCase() ||
                              (categoryObj && product.categoryId.toLowerCase() === categoryObj.name.toLowerCase());
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory, products]);

  return (
    <div className="min-h-screen flex flex-col bg-brand-light">
      <Header 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        activeCategory={activeCategory}
        setActiveCategory={handleCategoryChange}
      />
      
      <main className="flex-grow">
        {/* Hero Section conditional logic */}
        {activeCategory === 'all' && !searchTerm ? (
          <Hero />
        ) : activeCategory === 'sach' ? (
          <section className="bg-gradient-to-br from-[#1a2a29] to-brand-dark text-brand-beige py-12 border-b border-brand-cream/5">
            <div className="container mx-auto px-4 text-center">
              <span className="text-4xl mb-4 block">📚</span>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Tủ Sách Tri Thức</h1>
              <p className="text-brand-beige/60 max-w-xl mx-auto italic">
                "Một cuốn sách hay là một người bạn tốt. Đây là những cuốn sách đã thay đổi tư duy và cuộc sống của tôi."
              </p>
            </div>
          </section>
        ) : null}

        <section className="py-8 md:py-12 bg-brand-light">
          <div className="container mx-auto px-4">
            <h2 className="text-[10px] font-bold text-brand-beige/30 mb-6 text-center tracking-[0.3em] uppercase">Khám phá danh mục</h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 max-w-6xl mx-auto">
              <button
                onClick={() => handleCategoryChange('all')}
                className={`flex flex-col items-center p-3 md:p-5 rounded-2xl border transition-all duration-300 ${
                  activeCategory === 'all' 
                    ? 'bg-brand-accent border-brand-accent text-brand-cream shadow-xl scale-105' 
                    : 'bg-brand-dark/20 border-brand-cream/10 text-brand-beige/70 hover:border-brand-accent/50 hover:bg-brand-dark/30 shadow-sm'
                }`}
              >
                <span className="text-xl md:text-3xl mb-1">🌟</span>
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Tất cả</span>
              </button>
              {CATEGORIES.map(cat => (
                <CategoryCard 
                  key={cat.id} 
                  category={cat} 
                  isActive={activeCategory === cat.slug}
                  onClick={handleCategoryChange}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="product-list" className="py-12 md:py-16 bg-brand-dark/5 border-t border-brand-cream/5 scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-beige tracking-tight flex items-center">
                  {activeCategory === 'sach' && <span className="mr-2">📚</span>}
                  {activeCategory === 'all' ? 'Sản phẩm mới nhất' : CATEGORIES.find(c => c.slug === activeCategory)?.name || activeCategory}
                </h2>
                {!isLoading && (
                  <p className="text-brand-beige/40 text-xs mt-1 uppercase tracking-widest">
                    {filteredProducts.length} mục được tìm thấy
                  </p>
                )}
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-brand-dark/20 aspect-[3/4] rounded-2xl animate-pulse border border-brand-cream/5"></div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-brand-dark/10 rounded-3xl border border-dashed border-brand-cream/10 max-w-xl mx-auto">
                <div className="text-4xl mb-4 opacity-20">📂</div>
                <h3 className="text-lg font-bold text-brand-beige/60">Chưa có dữ liệu</h3>
                <p className="text-brand-beige/30 text-sm mt-2 px-4">Danh mục này hiện đang được cập nhật thêm nội dung. Vui lòng quay lại sau nhé!</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
