// Telegram Bot Integration
const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '8215918565:AAEC5ks2VSx4m9nV10A-fGPtaal47c9yynQ';
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || '5884229681'; // O'z chat ID'ingiz

export const sendToTelegram = async (cartItems, userInfo = {}) => {
  try {
    let message = `
🎉 *Yangi Buyurtma!*\n
👤 *Foydalanuvchi:* ${userInfo.name || 'Noma\'lum'}
📧 *Email:* ${userInfo.email || 'Kiritilmagan'}
📱 *Telefon:* ${userInfo.phone || 'Kiritilmagan'}\n
*Mahsulotlar:*\n`;

    let totalPrice = 0;

    cartItems.forEach((item, idx) => {
      const subtotal = item.price * item.quantity;
      totalPrice += subtotal;
      message += `${idx + 1}. ${item.nameUz}\n`;
      message += `   💰 Narx: ${item.price.toLocaleString()} сўм\n`;
      message += `   📦 Miqdori: ${item.quantity}\n`;
      message += `   💵 Jami: ${subtotal.toLocaleString()} сўм\n\n`;
    });

    message += `━━━━━━━━━━━━━━━━━━\n`;
    message += `💵 *Jami Summa:* ${totalPrice.toLocaleString()} сўм\n`;
    message += `━━━━━━━━━━━━━━━━━━\n`;
    message += `⏰ *Vaqti:* ${new Date().toLocaleString('uz-UZ')}`;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    const data = await response.json();
    return data.ok;
  } catch (error) {
    console.error('Telegram xatosi:', error);
    return false;
  }
};

export const sendProductImage = async (product, quantity = 1) => {
  try {
    const message = `
🎁 *Mahsulot Tanlandi!*\n
📦 *Nomi:* ${product.nameUz}\n
💰 *Narx:* ${product.price.toLocaleString()} сўм\n
📊 *Miqdori:* ${quantity}\n
💵 *Jami:* ${(product.price * quantity).toLocaleString()} сўм`;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        photo: product.image,
        caption: message,
        parse_mode: 'Markdown',
      }),
    });

    const data = await response.json();
    return data.ok;
  } catch (error) {
    console.error('Rasmni yuborish xatosi:', error);
    return false;
  }
};

export const notifyOrderStatus = async (orderId, status) => {
  try {
    const message = `
✅ *Buyurtma Yangilandi!*\n
🆔 *Buyurtma ID:* ${orderId}\n
📊 *Status:* ${status}\n
⏰ *Vaqti:* ${new Date().toLocaleString('uz-UZ')}`;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    const data = await response.json();
    return data.ok;
  } catch (error) {
    console.error('Status yuborish xatosi:', error);
    return false;
  }
};

export const sendAllProducts = async (products) => {
  try {
    const baseUrl = window.location.origin;
    
    for (const product of products) {
      const imageUrl = product.image.startsWith('http') 
        ? product.image 
        : `${baseUrl}${product.image}`;

      const message = `
🎁 *${product.nameUz}*
🌐 EN: ${product.nameEn}
🇷🇺 RU: ${product.nameRu}
━━━━━━━━━━━━━━━━
💰 *Narx:* ${product.price.toLocaleString()} сўм
📂 *Kategoriya:* ${product.category}
📝 *Tavsif:* ${product.description}`;

      const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`;

      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          photo: imageUrl,
          caption: message,
          parse_mode: 'Markdown',
        }),
      });

      // Telegramni haddan ortiq so'rovlardan asiroyaning sabab, pause qo'shish
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    return true;
  } catch (error) {
    console.error('Barcha produktlarni yuborish xatosi:', error);
    return false;
  }
};
