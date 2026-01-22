
export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing information' }), { status: 400 });
    }

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8020901837:AAEC8EVvacpQrZNKU-fO9u_dX4um2B8C9q0';
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID || '6436979607';

    const text = `
✨ <b>LIÊN HỆ MỚI TỪ HUIME</b>
--------------------------
👤 <b>Tên:</b> ${name}
📧 <b>Email:</b> ${email}
📝 <b>Lời nhắn:</b>
<i>${message}</i>
--------------------------
📅 <i>Gửi lúc: ${new Date().toLocaleString('vi-VN')}</i>
    `;

    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      throw new Error('Telegram API failed');
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
