const config = {
    name: "تجربة",
    aliases: ["anhnen", "wp"],
    credits: "XaviaTeam /DiyaKD"
}

function onCall({ message }) {
    global.GET('https://anime.ocvat2810.repl.co/')
      .then(async res => {
            try {
                let imgStream = await global.getStream(res.data.url);
                message.reply({
                    body: res.data.url,
                    attachment: imgStream
                });
            } catch {
                message.reply("Error!");
            }
        })
        .catch(_ => message.reply("Error!"));
}

export default {
    config,
    onCall
        }