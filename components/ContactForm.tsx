
import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      // Gọi đến API route nội bộ thay vì API Telegram trực tiếp
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        // Reset sau 5 giây
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error(data.error || 'Có lỗi xảy ra khi gửi yêu cầu.');
      }
    } catch (error: any) {
      console.error('Lỗi Submit:', error);
      setErrorMessage(error.message);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 10000);
    }
  };

  return (
    <div className="bg-brand-dark/30 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-brand-cream/10 shadow-xl max-w-lg mx-auto w-full">
      <h3 className="text-xl font-bold text-brand-beige mb-6 text-center">Liên hệ với HUIME</h3>
      
      {status === 'success' && (
        <div className="bg-green-500/20 border border-green-500/30 text-green-200 p-4 rounded-xl text-sm mb-4 text-center animate-bounce">
          ✅ Gửi yêu cầu thành công! Cảm ơn bạn đã quan tâm.
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-500/20 border border-red-500/30 text-red-200 p-4 rounded-xl text-sm mb-4 text-center">
          ❌ {errorMessage || 'Không thể gửi tin nhắn lúc này.'}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-brand-beige/50 uppercase tracking-wider mb-1">Họ tên</label>
          <input
            required
            type="text"
            disabled={status === 'sending'}
            placeholder="Nhập họ tên của bạn"
            className="w-full px-4 py-3 rounded-xl border border-brand-cream/10 bg-brand-dark/20 focus:bg-brand-dark/40 focus:ring-2 focus:ring-brand-accent focus:outline-none transition-all text-sm text-brand-beige placeholder:text-brand-beige/20 disabled:opacity-50"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-brand-beige/50 uppercase tracking-wider mb-1">Email</label>
          <input
            required
            type="email"
            disabled={status === 'sending'}
            placeholder="example@email.com"
            className="w-full px-4 py-3 rounded-xl border border-brand-cream/10 bg-brand-dark/20 focus:bg-brand-dark/40 focus:ring-2 focus:ring-brand-accent focus:outline-none transition-all text-sm text-brand-beige placeholder:text-brand-beige/20 disabled:opacity-50"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-brand-beige/50 uppercase tracking-wider mb-1">Nội dung</label>
          <textarea
            required
            rows={4}
            disabled={status === 'sending'}
            placeholder="Nội dung bạn cần tư vấn..."
            className="w-full px-4 py-3 rounded-xl border border-brand-cream/10 bg-brand-dark/20 focus:bg-brand-dark/40 focus:ring-2 focus:ring-brand-accent focus:outline-none transition-all text-sm resize-none text-brand-beige placeholder:text-brand-beige/20 disabled:opacity-50"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full bg-brand-accent hover:opacity-90 text-brand-cream font-bold py-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-brand-accent/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {status === 'sending' ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Đang xử lý...</span>
            </>
          ) : (
            <span>Gửi yêu cầu ngay</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
