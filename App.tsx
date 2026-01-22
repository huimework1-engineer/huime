
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
        const response = await fetch(`${SHEET_CSV_URL}&t=${Date.now()}`); // Cache busting
        const csvText = await response.text();
        const rows = parseCSV(csvText);
        const dataRows = rows.slice(1); 
        
        const mappedProducts: Product[] = dataRows
          .filter(row => row[1] || row[3]) 
          .map((row, index) => ({
            id: `p-${index}`,
            categoryId: (row[0] || 'all').trim().toLowerCase(),
            affiliateUrl: row[1] || '#',
            imageUrl: row[2] || '',
            name: row[3] || 'Sản phẩm HUIME',
            description: '',
          }));

        setProducts(mappedProducts);
      } catch (error) {
        console.error("Sheet Load Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSheetData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const catObj = CATEGORIES.find(c => c.slug === activeCategory);
      
      const matchCat = activeCategory === 'all' || 
                       p.categoryId === activeCategory || 
                       (catObj && p.categoryId === catObj.name.toLowerCase());
      return matchSearch && matchCat;
    });
  }, [searchTerm, activeCategory, products]);

  return (
    <div className="min-h-screen flex flex-col bg-brand-light text-brand-beige selection:bg-brand-accent selection:text-white">
      <Header 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      
      <main className="flex-grow">
        {activeCategory === 'all' && !searchTerm ? (
          <Hero />
        ) : activeCategory === 'sach' ? (
          <section className="bg-gradient-to-b from-brand-dark to-brand-light py-12 md:py-20 border-b border-brand-cream/5">
            <div className="container mx-auto px-4 text-center">
              <span className="inline-block p-4 rounded-full bg-brand-accent/10 text-4xl mb-6 shadow-2xl">📚</span>
              <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Tủ Sách HUIME</h1>
              <p className="text-brand-beige/60 max-w-2xl mx-auto text-lg font-medium leading-relaxed italic">
                "Đọc một cuốn sách hay cũng giống như trò chuyện với những bộ óc tuyệt vời nhất của các thế kỷ đã trôi qua."
              </p>
            </div>
          </section>
        ) : (
          <div className="h-12"></div>
        )}

        <section className="py-8 bg-brand-light">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                {activeCategory === 'all' ? '✨ Gợi ý cho bạn' : `📂 ${CATEGORIES.find(c => c.slug === activeCategory)?.name || 'Kết quả'}`}
              </h2>
              <span className="text-[10px] font-bold bg-brand-dark/40 px-3 py-1 rounded-full text-brand-accent border border-brand-accent/20">
                {filteredProducts.length} MỤC
              </span>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-brand-dark/20 rounded-3xl animate-pulse"></div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {filteredProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="text-center py-32 rounded-3xl border-2 border-dashed border-brand-cream/10">
                <p className="text-brand-beige/20 text-5xl mb-4">📭</p>
                <h3 className="text-xl font-bold text-brand-beige/40">Không tìm thấy sản phẩm phù hợp</h3>
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
