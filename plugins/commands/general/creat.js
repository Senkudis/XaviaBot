import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
});

const response = openai.responses.create({
  model: "gpt-4o-mini",
  input: "write a haiku about ai",
  store: true,
});

response.then((result) => console.log(result.output_text)); 

const config = {
    name: "صمم",
    aliases: ["اصنع"],
    description: "غير مكتمل",
    usage: "text",
    cooldown: 5,
    permissions: [2],
    credits: "Citnut",
    extra: {}
}

const langData = {
    "ar_SY": {
        "openai.needmsg": "أدخل محتوى الرسالة",
        "openai.error": "حدث خطأ ❌"
    },
    "en_US": {
        "openai.needmsg": "Need a message!",
        "openai.error": "error..."
    }
}

const configuration = new Configuration({ apiKey })
const openai = new OpenAIApi(configuration)

async function onCall({ message, args, getLang, extra, data, userPermissions, prefix }) {

    if (!args[0]) return message.reply(getLang("openai.needmsg"))
    try {
        const isImage = args[0].toLowerCase() == "image";
        const prompt = args.join(" ");

        if (isImage) {
            const response = await openai.createImage({
                prompt: prompt.slice(1),
                n: 1,
                size: '512x512',
                response_format: "url"
            })
            if (response.data.data?.[0]?.url) return message.reply({ attachment: await global.getStream(response.data.data[0].url) });
        } else {
            const res = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: prompt,
                max_tokens: 2000 - prompt.length
            })

            if (res?.data?.choices) return message.reply(res.data.choices[0].text);
        }

        return message.reply(getLang("openai.error"))
    } catch (e) {
        console.log(e)

        return message.reply(getLang("openai.error"))
    }

}


export default {
    config,
    langData,
    onCall
}
