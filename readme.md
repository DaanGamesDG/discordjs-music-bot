[![](https://imgur.com/TwTbu4t.png)](https://imgur.com/TwTbu4t.png)]

# Discordjs Music Bot
A simple music bot created with javascript, ffmpeg and discord.js.

# Installation
`npm install` you will need to do this in order to install the required packages.
Also install `ffmpeg`, you will need this in order to play music. Using Heroku? Check the tab heroku below!
Don't forget to check the setup below!

# Using Heroku to run your bot
Add `https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest.git` to your heroku buildpacks. 
Than restart your dyno and you should be able to run your bot.
Don't forget to check the setup below!

# dotenv Example
You will need to add a `.env` file if you want to run your bot on a vps or your own pc, if you want to use heroku, I would recommend using the built-in envoirment variables system.This is located in your app settings. Don't forget to copy the exact names of the enviorment variables, if you don't dont that, you will break the system.

```ts
DISCORD_BOT_TOKEN= // your bot token here
DISCORD_DATABASE_TOKEN= // your mongodb url here
DISCORD_BOT_YOUTUBE_API_KEY= // your youtube api key here
DISCORD_BOT_PREFIX= // your prefix here -> default is =
GUILD_ID= // emoji server id here
```

# Custom emoji usage
The bot uses a few custom emojis, make sure to create an emoji server and invite your bot here, than add the following emojis to the server and copy the exact name!

[![RedTick](https://emoji.gg/assets/emoji/4366_RedTick.png)](https://emoji.gg/emoji/4366_RedTick)

[![GreenTick](https://emoji.gg/assets/emoji/5727_GreenTick.png)](https://emoji.gg/emoji/5727_GreenTick)

# Disclaimer
This is an unmaintained project, if you encounter any issues or bugs you have to fix it yourself, I am not updating this repo anymore because its the old [stereo](https://stereodiscord.glitch.me). I am giving away this for free for people to get some custom bots to their server.

# How to setup
Step 1: Download or clone the repo to a folder you can find.
Step 2: Open your text editor (I recommend [vscode](https://code.visualstudio.com)) and make sure you can edit the bots file.
Step 3: Add a `.env` file and copy the dotenv example above. Change the values of the variables (check the info after //). Make sure you remove the comments and have no spaces, otherwise your project will crash.
Step 4: Make sure you have `nodejs` installed on your pc.
Step 5: Run `npm install` in your terminal (open one if you don't, there is an built-in terminal in vscode)
Step 6: Double check if you did everything correct.
Step 7: Yay, you can now run your bot, start it with `npm run start`.

# Useful Links/Information
You will need to install `nodejs` to run this bot, a valid discord bot application and a host.

[nodejs](https://nodejs.org/en/)

[discord developer portal](https://discord.com/developers/applications)

[How to create an application](https://discordpy.readthedocs.io/en/latest/discord.html)

[how to install nodejs](https://www.youtube.com/watch?v=qYwLOXjAiwM)

