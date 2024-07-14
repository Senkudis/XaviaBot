const config = {
  name: "ترتيب", // Name of command, it must be unique to identify with other commands
  description: "أسئلة عشوائية ", // Version of command
  usage: "", // Author of command
  cooldown: 5, // Time to wait before executing command again (seconds)
  permission: [0, 1, 2], // Role of user to use this command (0: normal user, 1: admin box chat, 2: owner bot)
  credits: "diyakd"
}

/*shortDescription: {
  vi: "đây là mô tả ngắn của lệnh",
  en: "this is short description of command"
}, // Short description of command
longDescription: {
  vi: "đây là mô tả dài của lệnh",
  en: "لعبة"
}, // Long description of command
category: "categoryName", // Category of command
guide: {
  vi: "đây là hướng dẫn sử dụng của lệnh",
  en: "this is guide of command"
} // Guide of command
},

langs: {
vi: {
  hello: "xin chào",
  helloWithName: "xin chào, id facebook của bạn là %1"
}, // Vietnamese language
en: {
  hello: "hello world",
  helloWithName: "hello, your facebook id is %1"
} // English language
},*/

// onStart is a function that will be executed when the command is executed
async function onCall({ message, questions, answer }) {
  // YOUR CODE HERE

  let questions = [
    {
      question: "ر م ص",
      answer: "مصر"
    },
    {
      question: "ج ا ز ل ا ئ ر",
      answer: "الجزائر"
    },
    {
      question: "ش ط م",
      answer: "مشط"
    },
    {
      question: "ة م ع ش",
      answer: "شمعة"
    },
    {
      question: "ب س ا ح ",
      answer: "سحاب"
    }, {
      question: "ر ق م",
      answer: "قمر"
    }, {
      question: " ل م ك",
      answer: "ملك"
    }, {
      question: " ا ا ل ر ن ر ج",
      answer: "الجنرار"
    }, {
      question: "ر ز ي و ا ل",
      answer: "الوزير"
    }, {
      question: "ا و ج ل ل",
      answer: "الجول"
    }, {
      question: "ب ر ا غ ئ",
      answer: "غرائب"
    }, {
      question: "ا م ل ك",
      answer: "كلام"
    }, {
      question: "ب ع ئ ج ا ",
      answer: "عجائب"
    }, {
      question: "ق ر ز ا ة ",
      answer: "قزارة"
    }, {
      question: "ع ج ة م",
      answer: "جمعة"
    }, {
      question: "ج و ا م ل ن",
      answer: "النجوم"
    }, {
      question: "ز م ن ل ا",
      answer: "الزمن"
    }, {
      question: "د ص ا ا ل ع",
      answer: "الصداع"
    }, {
      question: "ح ة ي ا ا ل",
      answer: "الحياة"
    }, {
      question: "ن ل ص ا ة ي ح",
      answer: "النصيحة"
    }, {
      question: "ا س ل ن ا ن ا ",
      answer: "الإنسان"
    }, {
      question: "ث ن ا ل ع ب ا ",
      answer: "الثعبان"
    }, {
      question: "ا ا ل ر ن",
      answer: "النار"
    }, {
      question: "ص ا ت ل م",
      answer: "الصمت"
    }, {
      question: "ل س ا ة ع ",
      answer: "الساعة"
    },
  ];
  let randomIndex = Math.floor(Math.random() * questions.length);
  let randomQuestion = questions[randomIndex].question;
  let answer = questions[randomIndex].answer;
  message.reply(randomQuestion, event.threadID, (err, messageInfo) => {
    let stopListening = api.listenMqtt((err, event) => {
      if (err) return console.error(err);

      switch (event.type) {
        case "message":
          if (event.threadID === messageInfo.threadID) {
            if (event.body === answer) {
              message.reply("جميل انت سريع", event.threadID, event.messageID);
              return stopListening();
            } else if (event.body === 'ترتيب') {
              return stopListening();
            }
            api.markAsRead(event.threadID, (err) => {
              if (err) console.log(err);
            });
          }

          break;
      }
    });
  });

}
