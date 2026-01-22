
export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  // Chỉ chấp nhận phương thức POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Phương thức không được hỗ trợ' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { name, email, message } = await req.json();

    // 1. Backend Validation
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Vui lòng điền đầy đủ thông tin' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Email không hợp lệ' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. Lấy thông tin từ Environment Variables
    // Lưu ý: Token cung cấp trong prompt được dùng làm fallback nếu env chưa set
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8020901837:AAEC8EVvacpQrZNKU-fO9u_dX4um2B8C9q0';
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID || '6436979607';

    // 3. Định dạng thời gian Việt Nam
    const timestamp = new Date().toLocaleString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    // 4. Tạo nội dung tin nhắn HTML
    const telegramMessage = `
<b>📩 LIÊN HỆ MỚI - HUIME</b>
--------------------------
👤 <b>Họ tên:</b> ${name}
📧 <b>Email:</b> ${email}
📝 <b>Nội dung:</b>
<i>${message}</i>

⏰ <b>Thời gian:</b> ${timestamp}
--------------------------
<i>Gửi từ Serverless Hub</i>
    `;

    // 5. Gửi tới Telegram API
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: telegramMessage,
        parse_mode: 'HTML',
      }),
    });

    const result = await response.json();

    if (response.ok) {
      return new Response(JSON.stringify({ success: true, message: 'Gửi thành công' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      console.error('Telegram API Error:', result);
      return new Response(JSON.stringify({ error: 'Không thể kết nối với Telegram API' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error: any) {
    console.error('Internal Server Error:', error);
    return new Response(JSON.stringify({ error: 'Lỗi hệ thống, vui lòng thử lại sau' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
