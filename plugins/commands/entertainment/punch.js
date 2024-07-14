export const config = {
    name: "ضرب",
    version: "0.0.1-xaviabot-port-refactor",
    credits: "Mr.Aik3ro",
    description: "ضرب عضو",
    usage: "[تاقي الزول الداير تدقه]",
    cooldown: 5,
};

export async function onCall({ message }) {
    const { reply, mentions, react } = message;

    if (!mentions || !Object.keys(mentions)[0]) return reply("كدي تاقي الغلطان 🐸🔪");

    return GET('https://apiservice1.kisara.app/satou/api/endpoint/punch')
        .then(async res => {
            let mention = Object.keys(mentions)[0],
                tag = mentions[mention].replace("@", "");

            await react("✅");
            await reply({
                body: "أبــــــــــلــــــــــــع دا..😾🤜 " + tag,
                mentions: [{
                    tag: tag,
                    id: mention
                }],
                attachment: await global.getStream(res.data.url)
            });
        })
        .catch(err => {
            console.error(err);
            reply("حدث خطأ.");
        })
  }