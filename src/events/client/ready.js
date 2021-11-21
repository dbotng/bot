module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log("[Bot] Bot is successfully online.");

    const activityTexts = [
      "with Public Alpha 1.0.0",
      { name: "which content to blam or save", type: "WATCHING" },
      { name: "Newgrounds radio", type: "LISTENING" },
      { name: "my next Flash Game", type: "COMPETING" },
    ];
    setInterval(() => {
      client.user.setActivity(
        activityTexts[
          Math.floor(Math.random() * (activityTexts.length - 1) + 1)
        ]
      );
    }, 10000);
  },
};
