import { Configuration, OpenAIApi } from "openai";

const config = {
    name: "اي",
    aliases: ["ai", "أي"],
    description: "تفاعل مع الذكاء الاصطناعي Chatgpt",
    usage: "[text]",
    cooldown: 3,
    permissions: [0, 1, 2],
    credits: "diyakd",
    extra: {
        /*       openaiKey: `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`,
                organization: `org-3iZHgAAdiaBSQFaUXqIPuWD5`*/
        openaiKey: "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",
        organization: "org-3iZHgAAdiaBSQFaUXqIPuWD5"
    }
}


const langData = {
    "ar_SY": {
        "missingInput": "المدخلات مفقودة.",
        "noAnswer": "لا توجد إجابة...",
        "error": "حدث خطأ، يرجى المحاولة لاحقًا...",
    },
    "en_US": {
        "missingInput": "Mising input.",
        "noAnswer": "No data...",
        "error": "Error, try again later...",
        "notAllowed": "Not available, please contact page:\nhttps://www.facebook.com/profile.php?id=100023332938115"
    }
}



const configuration = new Configuration({
    organization: `org-QkeThRqD15ae3AJhf1GFqHeV`,
    apiKey: "",
});

const openai = new OpenAIApi(configuration);



//const allowed = ["8097884703615480","5999736250058000"];
async function onCall({ message, args, getLang }) {
    // if (!allowed.some(e => e == message.threadID) && !global.config.MODERATORS.some(e => e == message.senderID)) return message.reply(getLang("notAllowed"));
    const ask = args.join(" ");
    if (!ask) return message.reply(getLang("missingInput"));

    try {
        await message.react("⏳");
        const _data = await askAI(ask);
        if (_data.length === 0)
            return message.react("❌").then(message.reply(getLang("error")));

        await message.react("✅");
        message.reply(_data);
    } catch (e) {
        console.error(e?.response?.data || e.message || e);
        message.react("❌").then(message.reply(getLang("error")));
    }

    return;
}

async function askAI(ask) {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: ask,
        temperature: 0.9,
        n: 1,
        stream: false,
        // stop: ["\n", " Human:", " AI:"],
        max_tokens: 4000
    })

    return response.data.choices[0].text;
}

export default {
    config,
    langData,
    onCall
}