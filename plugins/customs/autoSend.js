import cron from "node-cron";

// learn more about cron time here:
// https://www.npmjs.com/package/node-cron?activeTab=readme
const jobs = [
    {
        time: "0 22 * * *", // every day at 22:00 (10 PM)
        message: () => "اللهم بك أصبحنا و بك أمسينا و بك  نحيا و بك نموت و إليك النشور",
    },
    {
        time: "21 22 * * *", // every day at 22:21 (10:21 PM)
        message: () => "!عشره وعشرين دقيقه وما دايرين تنموموا-_-",
        // list of ids that bot will send to, remove this to send to all group
    },
    {
        time: "07 22 * * *", // every day at 22:21 (7:21 AM)
        message: () => "!صبح صبح يا فالح قوم لحياتك كافح.... اذا كان عندك حياة اصلا-_-",
    },
];

export default function autoSend() {
    const timezone = global.config?.timezone || "Africa/Khartoum";
    if (!timezone) return;

    for (const job of jobs) {
        cron.schedule(
            job.time,
            () => {
                let i = 0;
                for (const tid of job.targetIDs ||
                    Array.from(global.data.threads.keys()) ||
                    []) {
                    setTimeout(() => {
                        global.api.sendMessage(
                            {
                                body: job.message(),
                            },
                            tid
                        );
                    }, i++ * 300);
                }
            },
            {
                timezone: timezone,
            }
        );
    }
}
