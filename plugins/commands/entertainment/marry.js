import { join } from "path";
import { loadImage, createCanvas } from "canvas";

export const config = {
    name: "عرسني",
    version: "0.0.1-xaviabot-port-refactor",
    credits: "Diyakdس",
    description: "",
    usage: "[tag]",
    cooldown: 5
};

const marryPath = join(global.assetsPath, "marrywi.png");
export async function onLoad() {
    global.downloadFile(marryPath," https://i.ibb.co/VDrz7Q9/336377253-520155543604186-3362317639442779902-n.png");
}


export async function makeImage({ one, two }) {
    const template = await loadImage(marryPath);

    let avatarPathOne = join(global.cachePath, `avt_${one}.png`);
    let avatarPathTwo = join(global.cachePath, `avt_${two}.png`);

    await global.downloadFile(avatarPathOne, global.getAvatarURL(one));
    await global.downloadFile(avatarPathTwo, global.getAvatarURL(two));

    const avatarOne = await loadImage(avatarPathOne);
    const avatarTwo = await loadImage(avatarPathTwo);

    const avatarOneCircle = await global.circle(avatarOne, avatarOne.width / 2, avatarOne.height / 2, avatarOne.width / 2);
    const avatarTwoCircle = await global.circle(avatarTwo, avatarTwo.width / 2, avatarTwo.height / 2, avatarTwo.width / 2);

    const canvas = createCanvas(template.width, template.height);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(template, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(avatarOneCircle, 200, 23, 60, 60);
    ctx.drawImage(avatarTwoCircle, 136, 40, 60, 60);

    const pathImg = join(global.cachePath, `marry_${one}_${two}.png`);
    const imageBuffer = canvas.toBuffer();

    global.deleteFile(avatarPathOne);
    global.deleteFile(avatarPathTwo);

    global.writeFile(pathImg, imageBuffer);
    return pathImg;
}

export async function onCall({ message }) {
    const { senderID, mentions } = message;
    const mention = Object.keys(mentions);
    if (!mention[0]) return message.reply("كدي تاقي تعيسة/تعيس الحظ 🐸🤏.");
    else {
        const one = senderID, two = mention[0];
        return makeImage({ one, two })
            .then(async path => {
                await message.reply({
                    body: "هييع.. أبشر 🐸✊..  ألف مليون مبروك بيت مال و عيال!",
                    attachment: global.reader(path)
                }).catch(e => {
                    message.reply("حصلت مشكلة، كدي حاول تاني.");
                    console.error(e);
                });

                global.deleteFile(path);
            })
            .catch(e => {
                message.reply("حدث خطأ، حاول مرة أخرى..");
                console.error(e);
            });
    }
}