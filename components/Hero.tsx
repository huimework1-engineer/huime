
import React from 'react';
import { FULL_BRAND_NAME } from '../constants';

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-brand-dark to-brand-deep text-brand-beige py-12 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight text-brand-beige">
          {FULL_BRAND_NAME}
        </h1>
        <p className="text-lg md:text-xl text-brand-beige/80 max-w-2xl mx-auto mb-8 font-light italic">
          "Đồng hành cùng bạn tìm kiếm những sản phẩm chất lượng nhất"
        </p>
        <div className="bg-brand-light/10 backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-3xl mx-auto border border-brand-cream/20 shadow-2xl">
          <p className="text-sm md:text-base text-brand-beige/90 leading-relaxed">
            Chúng tôi tập trung vào việc đánh giá và gợi ý những sản phẩm công nghệ, gia dụng và chăm sóc sức khỏe đáng tin cậy. Mỗi đề xuất đều dựa trên trải nghiệm thực tế và sự minh bạch hoàn toàn.
          </p>
        </div>
        <div className="mt-10">
          <a 
            href="#product-list"
            className="inline-block bg-brand-accent hover:opacity-90 text-brand-cream font-semibold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-brand-accent/25 active:scale-95"
          >
            Khám phá ngay
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
