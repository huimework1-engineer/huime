
export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  // Chỉ chấp nhận method POST
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Phương thức không được hỗ trợ' }), 
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Validate dữ liệu đầu vào cơ bản
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return new Response(
        JSON.stringify({ error: 'Vui lòng điền đầy đủ thông tin' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Lấy biến môi trường từ Vercel
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error('Missing Telegram Environment Variables');
      return new Response(
        JSON.stringify({ error: 'Cấu hình hệ thống chưa hoàn tất' }), 
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Định dạng thời gian Việt Nam
    const now = new Date();
    const formattedTime = new Intl.DateTimeFormat('vi-VN', {
      dateStyle: 'full',
      timeStyle: 'medium',
      timeZone: 'Asia/Ho_Chi_Minh'
    }).format(now);

    // Xây dựng nội dung message cho Telegram
    const telegramMessage = [
      `📩 <b>LIÊN HỆ MỚI - HUIME</b>`,
      `👤 <b>Họ tên:</b> ${name}`,
      `📧 <b>Email:</b> ${email}`,
      `📝 <b>Nội dung:</b>`,
      `<i>${message}</i>`,
      `\n⏰ <b>Thời gian:</b> ${formattedTime}`
    ].join('\n');

    // Gửi yêu cầu tới Telegram Bot API
    const telegramResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: telegramMessage,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      }),
    });

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json();
      console.error('Telegram API Error:', errorData);
      throw new Error('Không thể gửi tin nhắn tới Telegram');
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Gửi liên hệ thành công' }), 
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Contact API Error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Lỗi máy chủ nội bộ' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
