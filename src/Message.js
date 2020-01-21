const Discord = require('discord.js')
const fs = require('fs')
const util = require('util')

fs.readFilePr = util.promisify(fs.readFile);
fs.readdirPr = util.promisify(fs.readdir);

//Either fs or util is incompatible with channel.send with file.
//Node Sucks
//Let's try to delete Util by using only sync version of fs.
//edit. Seem like Util is the problem.
//Edit2 : Promisify hack from Guillian suck.

async function sendRandomLine(filename, channel)
{
    let content = await fs.readFilePr(filename)
    let lines = content.toString().split('\n')
    let line = lines[Math.floor(Math.random() * lines.length)];

    console.log(line)
    channel.send(line)
}

function sendPicture(picturePath, channel)
{
    const picture = new Discord.Attachment(picturePath)
    console.log(picture)
    channel.send(picture)
}

function sendTaunt(channel) {
    sendRandomLine("src/Assets/taunt", channel)
}

function sendArticle(channel) {
    sendRandomLine('src/Assets/articles', channel)
}

function sendQuote(channel) {
    sendRandomLine('src/Assets/quotes', channel)
}

function sendHaskellCurryPic(channel) {
    sendPicture("src/Assets/HaskellCurry.jpg", channel)
}

async function sendMeme(channel) {
    let files = await fs.readdirPr("src/Memes/")

    let file = files[Math.floor(Math.random() * files.length)]

    sendPicture("src/Memes/" + file, channel)
}

async function sendHelp(channel) {
    let content = await fs.readFilePr("src/help.txt", "utf8");
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