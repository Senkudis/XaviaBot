const config = {
    name: "كيدي",
    version: "1.1.0",
    description: "دردش مع كيدي",
    usage: "[أي نص]",
    cooldown: 3,
    permissions: [0, 1, 2],
    credits: "XaviaTeam | diyakd"
}

const langData = {
    "en_US": {
        "on": "Nino is now on",
        "off": "Nino is now off",
        "alreadyOn": "Nino is already on",
        "alreadyOff": "Nino is already off",
        "missingInput": "Please enter the content you want to chat with Nino",
        "noResult": "Nino doesn't understand what you're saying :(",
        "error": "An error occurred, please try again later"
    },
    "vi_VN": {
        "on": "Nino đã được bật",
        "off": "Nino đã được tắt",
        "alreadyOn": "Nino đã được bật",
        "alreadyOff": "Nino đã được tắt",
        "missingInput": "Vui lòng nhập nội dung cần trò chuyện với Nino",
        "noResult": "Nino không hiểu bạn đang nói gì :(",
        "error": "Có lỗi xảy ra, vui lòng thử lại sau"
    },
    "ar_SY": {
        "on": "تم تشغيل كيدي 😀",
        "off": "تم إيقاف كيدي 😴",
        "alreadyOn": "kede is already on",
        "alreadyOff": "kede is already off",
        "missingInput": "الرجاء إدخال المحتوى الذي تريد الدردشة مع كيدي 🐥",
        "noResult": "كيدي لا يفهم ما تقول :(",
        "error": "حدث خطأ,امش كمل قرايتك وتعال "
    }
}

function onLoad() {
    if (!global.hasOwnProperty("nino")) global.nino = {};
}

async function onCall({ message, args, getLang, userPermissions }) {
    const input = args.join(" ");
    if (!input) return message.reply(getLang("missingInput"));

    if (input == "on" || input == "off")
        if (!userPermissions.includes(1)) return;

    if (input == "on") {
        if (global.nino.hasOwnProperty(message.threadID)) return message.reply(getLang("alreadyOn"));
        global.nino[message.threadID] = true;

        return message.reply(getLang("on"));
    } else if (input == "off") {
        if (!global.nino.hasOwnProperty(message.threadID)) return message.reply(getLang("alreadyOff"));
        delete global.nino[message.threadID];

        return message.reply(getLang("off"));
    }
    if (global.nino.hasOwnProperty(message.threadID)) return;

    global
        .GET(`${global.xva_api.main}/nino/get?key=${encodeURIComponent(input)}`)
        .then((res) => {
            const { data } = res;
            const { status } = data;

            if (status == 1) {
                return message.reply(data.reply);
            } else {
                return message.reply(getLang("noResult"));
            }
        })
        .catch((err) => {
            return message.reply(getLang("error"));
        });
}

export default {
    config,
    onLoad,
    langData,
    onCall
}
