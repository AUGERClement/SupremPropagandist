const Discord = require('discord.js')
const fs = require('fs')
const util = require('util')

fs.readFile = util.promisify(fs.readFile);
fs.readdir = util.promisify(fs.readdir);

async function sendRandomLine(filename, channel)
{
    let content = await fs.readFile(filename)
    let lines = content.toString().split('\n')
    let line = lines[Math.floor(Math.random() * lines.length)];

    channel.send(line)
}

function sendPicture(picturePath, channel)
{
    const picture = new Discord.Attachment(picturePath)
    console.log(picture)
    channel.send(picture)
}

async function sendTaunt(channel) {
    sendRandomLine("src/Assets/taunt", channel)
}

async function sendArticle(channel) {
    sendRandomLine('src/Assets/articles', channel)
}

async function sendQuote(channel) {
    sendRandomLine('src/Assets/quotes', channel)
}

function sendHaskellCurryPic(channel) {
    sendPicture("src/Assets/HaskellCurry.jpg", channel)
}

async function sendMeme(channel) {
    let files = await fs.readdir("src/Memes/")

    let file = files[Math.floor(Math.random() * files.length)]

    sendPicture("src/Memes/" + file, channel)
}

async function sendHelp(channel) {
    let content = await fs.readFile("src/help.txt", "utf8");
    channel.send(content)
}


//request is toLowerCased
function parseRequest(request, channel) {

    switch (request) {
        case 'god':
            sendHaskellCurryPic(channel)
            break
        case 'meme':
            sendMeme(channel)
            break
        case 'quote':
            sendQuote(channel)
            break
        case 'story':
            sendArticle(channel)
            break
        case 'taunt':
            sendTaunt(channel)
            break
        default:
            sendHelp(channel)
    }
}
module.exports = {parseRequest}