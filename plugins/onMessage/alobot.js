import moment from "moment-timezone";

export const config = {
    name: "alobot",
    version: "0.0.1-xaviabot-port",
    credits: "Diyakd",
    description: "Gọi Bot Version 3"
};

async function handleReply({ message, data, eventData }) {
    var name = data.user?.info?.name || message.senderID;

    switch (eventData.type) {
        case "reply": {
            var listMods = global.config.MODERATORS;
            for (let mod of listMods) {
                await message
                    .send({
                        body: "➣ 𝐓𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐭𝐮̛̀ " + name + ":\n" + message.body,
                        mentions: [{
                            id: message.senderID,
                            tag: name
                        }]
                    }, mod)
                    .then(data => data.addReplyEvent({
                        messID: message.messageID,
                        type: "goibot",
                        author_only: false,
                        callback: handleReply
                    }))
                    .catch(err => console.error(err));

                global.sleep(300)
            }
            break;
        }
        case "goibot": {
            await message
                .send({ body: `${message.body}`, mentions: [{ tag: name, id: message.senderID }] }, eventData.id, eventData.messID)
                .then(data => data.addReplyEvent({
                    type: "reply",
                    author_only: false,
                    callback: handleReply
                }))
                .catch(err => console.error(err));


            break;
        }
        default: break;
    }
}


export async function onCall({ message, data }) {
    var { threadID, messageID, body, senderID } = message;
    if (senderID == global.data.botID) return;

    var time = moment.tz("Africa/Khartoum").format("HH:mm:ss D/MM/YYYY");
    let name = data.user?.info?.name || senderID,
        idbox = threadID,
        uidUser = senderID,
        dataThread = data.thread,
        threadInfo = dataThread.info;

    const listMods = global.config.MODERATORS;

    var tl = [
        " كيهيهيه نعم أنا سامعك 🐥.", "نعم? :3", " يبل أنا هنا 🙋.",
        "تتكلم ولا تتألم؟؟!!",
        `${name}` + ", أيواا انا معاك 🐣",
        `${name}` + ", أكتب .مساعدة عشان تشوف كل الأوامر 📢.",
        `${name}` + ", داير تستعمل البوت? أكتب  (.مساعدة) عشان تشوف قائمة الأوامر 📜.",
        `${name}` + ", لك حرية استعمال كل الأوامر"
    ];
    let rand = tl[Math.floor(Math.random() * tl.length)];
    // Gọi bot
    var arr = ["bot", "بوت", "سينكو", "البوت", "يا بوت", "بوط", "كيدي", "kede"];

    if (!arr.some(item => body.toLowerCase() == item)) return;

    let nameT = threadInfo.name;

    try {
        await message.send(rand, threadID);

        for (var mod of listMods) {
            await message
                .send({
                    body: `       ====「 𝐁𝐨𝐭 𝐍𝐨𝐭𝐢𝐟𝐢𝐜𝐚𝐭𝐢𝐨𝐧  」====\n────────────────────\nاسم المجموعة: ${nameT}\nمعرف المجموعة: ${idbox}\nاسم المستخدم: ${name} \nمعرف العضو: ${uidUser}\nالوقت: ${time}\nالمحتوى: ${body}\n────────────────────`,
                    mentions: [{ tag: name, id: uidUser }]
                }, mod)
                .then(data => data.addReplyEvent({
                    messID: messageID,
                    type: "goibot",
                    author_only: false,
                    callback: handleReply
                }))
                .catch(err => console.error(err));

            global.sleep(300)
        }


    } catch (e) {
        console.error(e);
    }

}