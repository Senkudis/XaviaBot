const langData = {
    "en_US": {
        "prefix.get": "Prefix is: {prefix}"
    },
    "ar_SY": {
        "prefix.get": "بادئة الأوامر هي: {prefix}"
    }
}

function onCall({ message, getLang, data }) {
    if (message.body == "prefix" && message.senderID != global.botID) {
        message.reply(getLang("prefix.get", {
            prefix: data?.thread?.data?.prefix || global.config.PREFIX
        }));
    }

    return;
}

export default {
    langData,
    onCall
}
