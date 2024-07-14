export const config = {
    name: "رشق",
    version: "0.0.1-xaviabot-port-refactor",
    credits: "Mr.Aik3ro",
    description: "رشق عضو في المجموعة ",
    usage: "[Tag someone you need to spank]",
    cooldown: 5,
};

export async function onCall({ message }) {
    const { reply, mentions, react } = message;

    if (!mentions || !Object.keys(mentions)[0]) return reply("الرجاء الإشارة للشخص المطلوب");

    return GET('https://apiservice1.kisara.app/satou/api/endpoint/spank')
        .then(async res => {
            let mention = Object.keys(mentions)[0],
                tag = mentions[mention].replace("@", "");

            await react("✅");
            await reply({
                body: "تم رشقك! " + tag,
                mentions: [{
                    tag: tag,
                    id: mention
                }],
                attachment: await global.getStream(res.data.url)
            });
        })
        .catch(err => {
            console.error(err);
            reply("Error");
        })
}