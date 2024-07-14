import axios from 'axios';
import cheerio from 'cheerio';

const config = {
    name: "fbimg",
    description: "Finds the CDN link of an image from a Facebook post link",
    usage: "[link]",
    cooldown: 3,
    permissions: [0, 1, 2],
    credits: "XaviaTeam"
}

async function getLinks(url) {
    try {
        const response = await axios.get(url);
        const html = response.data;

        let imageLinks = [];
        let $ = cheerio.load(html);
        $('img').each(function(i, elem) {
            let link = $(this).attr('src');
            if (link.startsWith("https://scontent")) {
                imageLinks.push(link);
            }
        });
        return imageLinks;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function onCall({ message, args }) {
    if (!args.length) return message.reply("Please provide a link to a Facebook post.");

    let links = await getLinks(args[0]);
    console.log(links);
    if (!links) return message.reply("Failed to collect links.");
  if (!links) return message.reply("Error!");

    message.reply(links[0]);
}

export default {
    config,
    onCall
}