const config = {
    name: "ميمز",
    aliases: ["mêm", "mim"], 
    description: "random meme",
    version: "0.0.2-beta",
    permissions: [2],
    credits: "Diyakd"
};

const images = [
  "https://i.pinimg.com/736x/5c/62/90/5c6290cc2fc59b6ff13a47b214a98046.jpg", 
  "https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/11/Spy-x-family-ep-19-Anya-Forger.jpg", 
  "https://i.pinimg.com/originals/72/74/df/7274dfc9227195d2712b3c79208ba1f2", 
"https://i.imgur.com/Dvh3NQ3_d.png"
]

function getRandomIndex(arr) {
    return Math.floor(Math.random() * arr.length);
}

async function onCall({ message}) {
    try {
        if (images.length === 0) return message.reply(getLang("error"));

        const index = getRandomIndex(images);
        const image = images[index];

        const imageStream = await global.getStream(image);
        await message.reply({
            attachment: [imageStream]
        });
    } catch (e) {
        message.reply(getLang("error"));
    }

    return;
}

export default {
    config,
    onCall
};