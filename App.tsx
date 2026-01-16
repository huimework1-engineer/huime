
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
        // Bỏ qua dòng tiêu đề
        const dataRows = rows.slice(1); 
        
        const mappedProducts: Product[] = dataRows
          .filter(row => (row[1] && row[1].trim() !== '') || (row[3] && row[3].trim() !== '')) 
          .map((row, index) => {
            /**
             * Mapping theo yêu cầu mới:
             * A (row[0]): Hạng mục
             * B (row[1]): Link sản phẩm
             * C (row[2]): Ảnh sản phẩm
             * D (row[3]): Tiêu đề
             */
            return {
              id: `sheet-${index}`,
              categoryId: row[0] ? row[0].toString().trim() : 'all',
              affiliateUrl: row[1] || '#',
              imageUrl: row[2] || '',
              name: row[3] || 'Xem sản phẩm',
              description: '', // Không dùng mô tả theo yêu cầu mới
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
    scrollToProducts();
  }, [scrollToProducts]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const categoryObj = CATEGORIES.find(c => c.slug === activeCategory);
      // So khớp theo slug hoặc tên hạng mục trực tiếp từ sheet
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
        {activeCategory === 'all' && !searchTerm && <Hero />}

        {/* Categories Section */}
        <section className="py-12 bg-brand-light">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-bold text-brand-beige mb-8 text-center tracking-widest uppercase opacity-80">Danh mục sản phẩm</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
              <button
                onClick={() => handleCategoryChange('all')}
                className={`flex flex-col items-center p-5 rounded-2xl border transition-all duration-300 ${
                  activeCategory === 'all' 
                    ? 'bg-brand-accent border-brand-accent text-brand-cream shadow-xl scale-105' 
                    : 'bg-brand-dark/20 border-brand-cream/10 text-brand-beige/70 hover:border-brand-accent/50 hover:bg-brand-dark/30 shadow-sm'
                }`}
              >
                <span className="text-3xl mb-1">🌟</span>
                <span className="text-xs font-bold uppercase tracking-widest">Tất cả</span>
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

        {/* Product Listing Section */}
        <section id="product-list" className="py-16 bg-brand-dark/5 border-t border-brand-cream/5 scroll-mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-brand-cream/5 pb-6">
              <div>
                <h2 className="text-3xl font-bold text-brand-beige mb-2 tracking-tight">
                  {activeCategory === 'all' ? 'Sản phẩm đề xuất' : `Danh mục: ${activeCategory}`}
                </h2>
                {!isLoading && (
                  <p className="text-brand-beige/40 text-sm font-medium">
                    {filteredProducts.length} sản phẩm gợi ý
                  </p>
                )}
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-brand-dark/20 h-80 rounded-2xl animate-pulse"></div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-brand-dark/10 rounded-3xl border border-dashed border-brand-cream/10 max-w-2xl mx-auto">
                <div className="text-5xl mb-4 opacity-20">📦</div>
                <h3 className="text-xl font-bold text-brand-beige/60">Không tìm thấy sản phẩm</h3>
                <p className="text-brand-beige/30 mt-2">Vui lòng quay lại sau hoặc chọn danh mục khác.</p>
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
