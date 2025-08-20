import OpenAI from "openai";

// --- إعدادات البوت ---
const config = {
    name: "ai",
    aliases: ["ذكاء", "اسأل"],
    description: "تفاعل مع نماذج الذكاء الاصطناعي من OpenAI.",
    usage: "[النص الذي تريد إرساله]",
    cooldown: 5, // زيادة فترة الانتظار قليلاً لتجنب الإفراط في الاستخدام
    permissions: [0, 1, 2],
    credits: "diyakd & Manus",
    extra: {
        // من الأفضل دائمًا تحميل مفتاح API من متغيرات البيئة بدلاً من كتابته مباشرة في الكود
        openaiKey: process.env.OPENAI_API_KEY || "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", // ضع مفتاحك هنا كحل بديل
    }
};

// --- نصوص الردود بلغات مختلفة ---
const langData = {
    "ar_SY": {
        "missingInput": "الرجاء إدخال سؤال أو نص بعد الأمر.",
        "thinking": " أفكر في إجابة... 🤔",
        "noAnswer": "لم أتمكن من العثور على إجابة. 😥",
        "error": "حدث خطأ ما. يرجى المحاولة مرة أخرى لاحقًا. 🛠️",
    },
    "en_US": {
        "missingInput": "Please provide a question or text after the command.",
        "thinking": "Thinking of an answer... 🤔",
        "noAnswer": "I couldn't find an answer. 😥",
        "error": "An error occurred. Please try again later. 🛠️",
    }
};

// --- تهيئة OpenAI ---
// تأكد من أن مفتاح API متاح. إذا لم يكن كذلك، قم بتسجيل خطأ.
if (!config.extra.openaiKey) {
    console.error("خطأ: مفتاح OpenAI API غير موجود. يرجى إضافته إلى إعدادات الكود أو متغيرات البيئة.");
}
const openai = new OpenAI({
    apiKey: config.extra.openaiKey,
});


// --- الدالة الرئيسية التي يتم استدعاؤها عند تشغيل الأمر ---
async function onCall({ message, args, getLang }) {
    const ask = args.join(" ");
    if (!ask) {
        return message.reply(getLang("missingInput"));
    }

    try {
        // إعلام المستخدم بأن الطلب قيد المعالجة
        await message.reply(getLang("thinking"));
        await message.react("⏳");

        const aiResponse = await askAI(ask);

        if (!aiResponse) {
            await message.react("❌");
            return message.reply(getLang("noAnswer"));
        }

        // إرسال الرد وتحديث التفاعل
        await message.reply(aiResponse);
        await message.react("✅");

    } catch (error) {
        console.error("حدث خطأ أثناء استدعاء OpenAI API:", error);
        await message.react("❌");
        await message.reply(getLang("error"));
    }
}

// --- دالة التفاعل مع OpenAI API ---
async function askAI(prompt) {
    try {
        // استخدام نموذج أحدث وأكثر كفاءة مثل gpt-3.5-turbo
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 1500, // تحديد حد أقصى للرد
            temperature: 0.7, // درجة حرارة متوازنة للإبداع والدقة
            n: 1,
        });

        // التأكد من وجود ردود قبل إرجاع النص
        if (completion.choices && completion.choices.length > 0) {
            return completion.choices[0].message.content.trim();
        } else {
            return null; // إرجاع null في حالة عدم وجود رد
        }
    } catch (error) {
        // تسجيل الخطأ وإعادة إلقائه لمعالجته في onCall
        console.error("خطأ في دالة askAI:", error.message);
        throw error;
    }
}

export default {
    config,
    langData,
    onCall
};
