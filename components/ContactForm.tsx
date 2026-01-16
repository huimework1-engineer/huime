
import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sending message:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="bg-brand-dark/30 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-brand-cream/10 shadow-xl max-w-lg mx-auto w-full">
      <h3 className="text-xl font-bold text-brand-beige mb-6 text-center">Liên hệ với HUIME</h3>
      {submitted ? (
        <div className="bg-green-500/20 border border-green-500/30 text-green-200 p-4 rounded-xl text-sm animate-pulse text-center">
          Cảm ơn bạn! Tin nhắn của bạn đã được gửi thành công.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-brand-beige/50 uppercase tracking-wider mb-1">Họ tên</label>
            <input
              required
              type="text"
              placeholder="Nhập tên của bạn"
              className="w-full px-4 py-3 rounded-xl border border-brand-cream/10 bg-brand-dark/20 focus:bg-brand-dark/40 focus:ring-2 focus:ring-brand-accent focus:outline-none transition-all text-sm text-brand-beige placeholder:text-brand-beige/20"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-brand-beige/50 uppercase tracking-wider mb-1">Email</label>
            <input
              required
              type="email"
              placeholder="example@email.com"
              className="w-full px-4 py-3 rounded-xl border border-brand-cream/10 bg-brand-dark/20 focus:bg-brand-dark/40 focus:ring-2 focus:ring-brand-accent focus:outline-none transition-all text-sm text-brand-beige placeholder:text-brand-beige/20"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-brand-beige/50 uppercase tracking-wider mb-1">Nội dung</label>
            <textarea
              required
              rows={4}
              placeholder="Bạn cần hỗ trợ điều gì?"
              className="w-full px-4 py-3 rounded-xl border border-brand-cream/10 bg-brand-dark/20 focus:bg-brand-dark/40 focus:ring-2 focus:ring-brand-accent focus:outline-none transition-all text-sm resize-none text-brand-beige placeholder:text-brand-beige/20"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-brand-accent hover:opacity-90 text-brand-cream font-bold py-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-brand-accent/20"
          >
            Gửi yêu cầu
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
