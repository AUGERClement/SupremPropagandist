const Discord = require('discord.js')
const fs = require('fs')
const util = require('util')

fs.readFilePr = util.promisify(fs.readFile);
fs.readdirPr = util.promisify(fs.readdir);

//Guillian, I curse your stupid use of promisify !
//fs.readFile = util.promisify(fs.readFile) is bad stuff.
//If a lib use the old readFile, you are screwed.

async function sendRandomLine(filename, channel)
{
    let content = await fs.readFilePr(filename)
    let lines = content.toString().split('\n')
    let line = lines[Math.floor(Math.random() * lines.length)];

    console.log(line)
    channel.send(line)
}

async function sendMeme(channel, memeType) {
    let memeFolderPath = "src/Memes/" + memeType
    let files = await fs.readdirPr(memeFolderPath)
    let file = files[Math.floor(Math.random() * files.length)]

    sendPicture(memeFolderPath + "/" + file, channel)
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

function sendHaskellMeme(channel) {
    sendMeme(channel, "Haskell")
}

function sendJSMeme(channel) {
    sendMeme(channel, "JS")
}

async function sendHelp(channel) {
    let content = await fs.readFilePr("src/help.txt", "utf8");
    channel.send(content)
}

function sendNuke(channel) {
    sendPicture('src/Assets/nuke.png', channel)
}

//That's some serious currification shit.
const switchcase = cases => defaultCase => key =>
cases.hasOwnProperty(key) ? cases[key] : defaultCase

//switchCase for function
const switchcaseF = cases => defaultCase => key =>
switchcase(cases)(defaultCase)(key)()

//request is toLowerCased
function parseRequest(request, channel) {
    requestReplies = {
        "god": sendHaskellCurryPic,
        "hmeme": sendHaskellMeme,
        "jsmeme": sendJSMeme,
        "quote": sendQuote,
        "story": sendArticle,
        "taunt": sendTaunt,
        "nuke": sendNuke
    }
    if (!requestReplies[request]) {
        sendHelp(channel)
    } else {
        requestReplies[request](channel)
    }
}

module.exports = {parseRequest}