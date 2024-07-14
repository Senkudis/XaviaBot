const config = {
    name: "ريبوت",
    aliases: ["rs", "rest", "reboot","إيقاف"],
    permissions: [2],
    isAbsolute: true
}

async function onCall({ message, getLang }) {
    await message.reply("جار إعادة التشغيل...");
    global.restart();
}

export default {
    config,
    onCall
}
