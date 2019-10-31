require('dotenv').config()
const fs = require('fs');
const exec = require('child_process').exec;
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

const { createEventAdapter } = require('@slack/events-api');
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackEvents = createEventAdapter(slackSigningSecret, {
    waitForResponse: true,
});

const os = require('os');
const platform = os.platform();
if (platform === 'win32') {
    const winsay = require('winsay');
}




slackEvents.on('reaction_added', (event, respond, error) => {
    // console.log('Reaction event received', event);
    if (event.type === 'reaction_added') {
        const emoticonText = event.text;
        var outputDevice = '';
        var player = 'afplay ';
        if (emoticonText) {
            //pick output device 1 = headphones, 2 = speakers (default) - windows only
            if (platform === 'win32') {
                player = 'mplayer ';
                const hasTest = message.text.indexOf("test");
                if (hasTest > -1) { //test was included, so play through device 1 (headphones)
                    outputDevice = '-ao dsound:device=1 ';
                } else {
                    //test not included so play through device 2 (speakers)
                    outputDevice = '-ao dsound:device=2 ';
                }
            } else {
                outputDevice = '';
            }
            respond.status(200).send();
        };
    };

    const emoticon = event.reaction;

    if (emoticon !== undefined) {
        const emoticonMp3 = `approved-sounds/${emoticon}.mp3`;

        fs.exists(emoticonMp3, function (existsMp3) {
            if (existsMp3) {
                exec(`${player}${outputDevice} ${emoticonMp3}`);
                console.log(`playing: ${emoticonMp3}`);
            }
        });    
        respond.status(200).send();
    } else {
            return console.log(error.name);
        }
});

slackEvents.on('error', (error) => {
    return console.log(`${error.name}: ${error}`);
});

app.listen(process.env.PORT,`Listening for events on ${process.env.PORT}` )

(async (req, res) => {
    const server = await slackEvents.start(process.env.PORT);
    console.log(`Listening for events on ${server.address().process.env.PORT}`);
    respond.status(200).send();
})();