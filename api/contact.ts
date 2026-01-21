
export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { name, email, message } = await req.json();

    // Validation cơ bản
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Vui lòng nhập đầy đủ thông tin' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Lấy Token và Chat ID từ biến môi trường
    // Lưu ý: Trên Vercel bạn cần set các biến này trong Project Settings
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8020901837:AAEC8EVvacpQrZNKU-fO9u_dX4um2B8C9q0';
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID || '6436979607';

    // Định dạng thời gian Việt Nam
    const now = new Date();
    const timestamp = now.toLocaleString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    // Format tin nhắn Telegram
    const telegramMessage = `
<b>📩 YÊU CẦU LIÊN HỆ MỚI</b>
--------------------------
👤 <b>Họ tên:</b> ${name}
📧 <b>Email:</b> ${email}
📝 <b>Nội dung:</b> ${message}
⏰ <b>Thời gian:</b> ${timestamp}

CC: @huiquang
--------------------------
<i>Gửi từ hệ thống HUIME Affiliate</i>
    `;

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
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      console.error('Telegram Error:', result);
      return new Response(JSON.stringify({ error: result.description }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
