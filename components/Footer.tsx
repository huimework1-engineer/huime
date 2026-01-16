
import React from 'react';
import { FULL_BRAND_NAME, CONTACT_EMAIL } from '../constants';
import ContactForm from './ContactForm';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-brand-beige pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Brand Info & Policies */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-brand-beige">{FULL_BRAND_NAME}</h2>
              <p className="text-brand-beige/70 leading-relaxed max-w-md">
                Chuyên trang review và giới thiệu sản phẩm chất lượng cao. Chúng tôi giúp người dùng đưa ra quyết định mua sắm thông minh thông qua các nội dung được kiểm chứng.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-brand-beige/40 uppercase tracking-widest">Pháp lý</h4>
                <ul className="space-y-1">
                  <li><a href="#" className="text-sm text-brand-beige/70 hover:text-brand-accent transition-colors">Bảo mật</a></li>
                  <li><a href="#" className="text-sm text-brand-beige/70 hover:text-brand-accent transition-colors">Điều khoản</a></li>
                  <li><a href="#" className="text-sm text-brand-beige/70 hover:text-brand-accent transition-colors">Cookie</a></li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-brand-beige/40 uppercase tracking-widest">Hỗ trợ</h4>
                <ul className="space-y-1">
                  <li><a href="#" className="text-sm text-brand-beige/70 hover:text-brand-accent transition-colors">Câu hỏi thường gặp</a></li>
                  <li><a href="#" className="text-sm text-brand-beige/70 hover:text-brand-accent transition-colors">Hợp tác</a></li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-brand-beige/40 uppercase tracking-widest">Liên hệ</h4>
                <p className="text-sm text-brand-beige/70 font-medium">{CONTACT_EMAIL}</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div id="contact">
            <ContactForm />
          </div>
        </div>

        <div className="border-t border-brand-cream/10 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-brand-beige/40">
            © {new Date().getFullYear()} {FULL_BRAND_NAME}. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-brand-beige/40 hover:text-brand-accent font-medium text-xs transition-colors">FACEBOOK</a>
            <a href="#" className="text-brand-beige/40 hover:text-brand-accent font-medium text-xs transition-colors">INSTAGRAM</a>
            <a href="#" className="text-brand-beige/40 hover:text-brand-accent font-medium text-xs transition-colors">YOUTUBE</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
