export const config = {
  name: "صداقة",
  version: "0.0.1-xaviabot-port",
  credits: "Isai Ivanov",
  description: "قبول طلبات الصداقة"
};

export async function onCall({ message, data }) {
  try {
    const { threadID, messageID, body, senderID } = message;
    if (senderID === global.data.botID) return;
    const ar2 = ["اضافة", "قبول"];
    if (ar2.some(item => body.toLowerCase() === item)) { 
      await new Promise((resolve, reject) => {
        global.api.handleFriendRequest(senderID, true, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
      
      const tl2 = ["تم قبول الطلب ✅"];
      const rand2 = tl2[Math.floor(Math.random() * tl2.length)];
      message.reply(rand2);
    }
  } catch (error) {
    console.error(error);
    message.reply("حدث خطأ❌.");
  }
           }