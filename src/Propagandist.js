const Discord = require('discord.js')
const parser = require('./Message.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
})

client.on("message", (message) => {
    var request = message.content.toLowerCase()
    if (message.content.startsWith("h!")) {
        request = message.content.replace("h!", "")
        parser.parseRequest(request, message.channel)
    }
})

propagand_key = "NjU4MzQxMTgwODM2MjgyMzg4.Xf-c_w.LkDIO14KrinjmjSMm4Qi0kraKgA"

client.login(propagand_key)