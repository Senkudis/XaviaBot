const config = {
    name: "المصدر",
    aliases: ["code", "about"],
    description: "عرض الكود المصدري للبوت"
}

const langData = {
    "en_US": {
        "details": "A Bot Messenger running on NodeJS:\n{source}"
    },
    "vi_VN": {
        "details": "Bot Messenger chạy trên NodeJS:\n{source}"
    },
    "ar_SY": {
        "details": "روبوت ماسنجر يعمل على لغة NodeJS من تطوير فريق Xavia و مساهمة Diyakd:\n{source}"
    }
}

const source = "https://www.facebook.com/DiyaAldinKD";
function onCall({ message, getLang }) {
    message.reply(getLang("details", { source }));
}

export default {
    config,
    langData,
    onCall
}
