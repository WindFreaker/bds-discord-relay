# BDS Discord Relay

This project is a simple behavior pack for Minecraft bedrock dedicated servers that relay chat messages and join/leave messages from the game server to a chosen Discord channel.

![A screenshot of Discord showing off the functionality of the behavior pack.](https://i.imgur.com/aaCmiFK.png)

> This will built entirely under Minecraft Bedrock v1.20.15 for server software v1.20.15.01 and has not been tested with any other versions. This uses multiple beta APIs and therefore could easily break with future versions of the game. I will do my best to maintain this project but no assurances can be made.

### Installation

First you need to create the Discord webhook that will be used by this project. There are many tutorials that already exist for creating Discord webhooks, so follow those instead as they are probably more up to date. However, make note of the webhook's URL. It will look something like `https://discord.com/api/webhooks/123456790/abra_kadabra_alakazam` and the important parts to note are the first set of numbers (which is the webhook's ID) and the following string of random characters (which is the webhook's token).

Next you will need to add this behavior pack to your server.

 1. Go to your `worlds` folder in your server files and locate your world.
 2. Create a new subfolder inside your world folder called `behavior_packs` (should sit alongside the `db` folder and `level.dat`). It might already exist.
 3. Upload `bds-discord-relay.zip` into the new `behavior_packs` folder and extract it.
 4. Now go back one folder until you see the `db` folder, the `behavior_parks` folder, and the `level.dat` file once again. You need to upload a file called `world_behavior_packs.json` (or modify and merge the existing and provided files if one already exists). The resulting file should contain the following:
 ```JSON
 [
	{
		"pack_id" : "14e467b4-e3aa-49d3-8352-f8439fd7b2ee",  // will not change
		"version" : [ 1, 0, 0 ]  // subject to change as the pack updates
	}
]

 ```
 4. Go all the way back to the root directory of your server files. You should see a folder called `config`. Copy `7c7e693f-99f4-41a9-95e0-1f57b37e1e12.zip` into the `config` folder and extract it.
 5. Enter the new `7c7e693f-99f4-41a9-95e0-1f57b37e1e12` folder and modify the `variables.json` file. Here you will need to paste the webhook's ID and token that you got when creating the Discord webhook in the beginning. If done properly the file will look something like this:
 ```JSON
 {
    "discord-webhook-id": "1234567890",               // won't look exactly like this
    "discord-webhook-token": "abra_kadabra_alakazam"  // your ID and token will be different
}
 ```

 Congratulations, you've added the behavior pack and provided it the necessary permissions to operate. Now comes the complicated part. Currently Mojang provides no way for the bedrock dedicated server software to enable experiments, which currently is an issue as this pack requires experimental APIs. To accomplish this, I've found it easiest to modify the world using the PC verison of the game, but I suppose it could be possible with the mobile version as well.

 1. Copy the world from your server to your `minecraftWorlds` folder. This folder can usually be found at `%localappdata%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang`.
 2. Launch the game, locate the world you just uploaded, and click on the pencil (edit) icon.
 3. Scroll down until you see a category of game settings called "Experiments" and enable the one called "Beta APIs."
 6. Finally re-upload the world file back to the server. If this is your first time enabling experiments for the world it will create a copy of the world instead of modifying the existing one, so move over that copy instead.

### Special thanks

I want to give a shoutout to the team at [Lunar Eclipse Studios](https://lunareclipse.studio/), whose [Starlight Skin API](https://lunareclipse.studio/creations/starlight-skinapi) is simply amazing and is used in this project to provide mugshots of the player's in-game skin when displaying chat messages on Discord's end. To say this would be a near impossible task to build from scratch all under the game's own limitations would be an understatement.