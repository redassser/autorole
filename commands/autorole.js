exports.run = (client,message,array) => {
    const Discord = require("discord.js");  
    const roleEmbed = new Discord.MessageEmbed()
    if(!message.member.permissions.has("ADMINISTRATOR")) {
        message.channel.send("Sorry! Admins only.")
        return;
    }
    if(!message.guild.me.permissions.has("MANAGE_CHANNELS")) {
        message.channel.send("Sorry! I don't have the *manage channels* permission.");
        return;
    }
    if (message.guild.channels.cache.find(h=>h.type==="GUILD_TEXT"&&h.name==="autorole")) {
        message.channel.send("Sorry! You already have an autorole channel. Here's an example.\nhttps://i.imgur.com/79G8hZc.png");
        return;
    }
    message.guild.channels.create("autorole", {
        type: "GUILD_TEXT",
        position: 0,
        permissionOverwrites: [
            {
                id: message.author.id,
                allow: ["SEND_MESSAGES"]
            },
            {
                id: message.guild.roles.everyone,
                deny: ["SEND_MESSAGES", "USE_EXTERNAL_EMOJIS"],
                allow: ["VIEW_CHANNEL", "ADD_REACTIONS", "READ_MESSAGE_HISTORY"]
            }
        ]
    }).then((chan)=>{
        roleEmbed
            .setTitle("autorole channel example")
            .setColor("RANDOM")
            .setDescription("You can move this channel anywhere.")
            .setImage("https://i.imgur.com/79G8hZc.png")
            .setFooter("Delete this message after!")
        chan.send({embeds:[roleEmbed]});
        message.channel.send(chan.toString());
    })
}
exports.desc = "Creates the autorole channel."
exports.inp = [""]