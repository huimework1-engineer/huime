
import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  const validate = () => {
    if (!formData.name.trim()) return "Vui lòng nhập họ tên";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Email không hợp lệ";
    if (!formData.message.trim()) return "Vui lòng nhập nội dung";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const error = validate();
    if (error) {
      setStatus('error');
      setMsg(error);
      return;
    }

    setStatus('loading');
    setMsg('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMsg('Cảm ơn bạn! Tin nhắn của bạn đã được gửi thành công.');
        setFormData({ name: '', email: '', message: '' });
        // Quay lại trạng thái bình thường sau 5s
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error(data.error || 'Có lỗi xảy ra khi gửi yêu cầu.');
      }
    } catch (err: any) {
      setStatus('error');
      setMsg(err.message || 'Lỗi kết nối server.');
    }
  };

  return (
    <div className="bg-brand-dark/30 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-brand-cream/10 shadow-2xl max-w-lg mx-auto w-full transition-all">
      <h3 className="text-2xl font-bold text-brand-beige mb-6 text-center">Gửi tin nhắn cho HUIME</h3>
      
      {status === 'success' && (
        <div className="bg-green-500/20 border border-green-500/30 text-green-200 p-4 rounded-2xl text-sm mb-6 text-center animate-in fade-in slide-in-from-top-4 duration-300">
          <span className="block text-xl mb-1">✅</span>
          {msg}
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-500/20 border border-red-500/30 text-red-200 p-4 rounded-2xl text-sm mb-6 text-center animate-in shake duration-300">
          <span className="font-bold">Lỗi:</span> {msg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-brand-beige/40 uppercase tracking-[0.2em] ml-1">Họ tên</label>
          <input
            required
            type="text"
            disabled={status === 'loading'}
            placeholder="Nguyễn Văn A"
            className="w-full px-5 py-4 rounded-2xl border border-brand-cream/10 bg-brand-dark/40 focus:bg-brand-dark/60 focus:ring-2 focus:ring-brand-accent focus:outline-none transition-all text-sm text-brand-beige placeholder:text-brand-beige/20 disabled:opacity-50"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-brand-beige/40 uppercase tracking-[0.2em] ml-1">Email</label>
          <input
            required
            type="email"
            disabled={status === 'loading'}
            placeholder="name@example.com"
            className="w-full px-5 py-4 rounded-2xl border border-brand-cream/10 bg-brand-dark/40 focus:bg-brand-dark/60 focus:ring-2 focus:ring-brand-accent focus:outline-none transition-all text-sm text-brand-beige placeholder:text-brand-beige/20 disabled:opacity-50"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-brand-beige/40 uppercase tracking-[0.2em] ml-1">Nội dung</label>
          <textarea
            required
            rows={4}
            disabled={status === 'loading'}
            placeholder="Bạn cần tư vấn về sản phẩm nào?"
            className="w-full px-5 py-4 rounded-2xl border border-brand-cream/10 bg-brand-dark/40 focus:bg-brand-dark/60 focus:ring-2 focus:ring-brand-accent focus:outline-none transition-all text-sm resize-none text-brand-beige placeholder:text-brand-beige/20 disabled:opacity-50"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-brand-accent hover:brightness-110 text-brand-cream font-bold py-4 rounded-2xl transition-all active:scale-95 shadow-xl shadow-brand-accent/20 flex items-center justify-center space-x-3 group disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? (
            <div className="flex items-center">
              <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Đang gửi...</span>
            </div>
          ) : (
            <>
              <span>Gửi yêu cầu ngay</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
