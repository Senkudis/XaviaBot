const config = {
    name: "ايقاف",
    aliases: ["إيقاف", "shutdown"],
    permissions: [2],
    isAbsolute: true
}

async function onCall({ message, getLang }) {
    await message.reply("جار إيقاف التشغيل...");
    global.shutdown();
}

export default {
    config,
    onCall,
    getLang
  }