import { http, HttpRequest, HttpRequestMethod, HttpHeader } from "@minecraft/server-net";
import { variables } from "@minecraft/server-admin";
import { world } from "@minecraft/server";

export class DiscordWebhook {
    private readonly webhookUrl: string;

    constructor() {
        // build and store webhook url
        const webhookId = variables.get("discord-webhook-id");
        const webhookToken = variables.get("discord-webhook-token");
        this.webhookUrl = `https://discord.com/api/webhooks/${webhookId}/${webhookToken}`;

        // subscribe internal methods to the applicable world events
        world.afterEvents.chatSend.subscribe(async (eventData) => {
            await this.relayChatMessage(
                eventData.sender.name,
                eventData.message,
            );
        });
        world.afterEvents.playerJoin.subscribe(async (eventData) => {
            await this.relayPlayerJoined(
                eventData.playerName,
            );
        });
        world.afterEvents.playerLeave.subscribe(async (eventData) => {
            await this.relayPlayerLeft(
                eventData.playerName,
            );
        });
    }

    private async sendRequest(
        body: string,
    ) {
        const request = new HttpRequest(this.webhookUrl);

        // boilerplate stuff for Discord's webhook API
        request.method = HttpRequestMethod.Post;
        request.headers = [
            new HttpHeader("Content-Type", "application/json"),
        ];

        // the actual meat of the message
        request.body = body;

        await http.request(request);
    }

    private async relayChatMessage(
        senderName: string,
        message: string,
    ) {
        await this.sendRequest(
            JSON.stringify({
                username: `<${senderName}>`,
                content: message,
                avatar_url: `https://starlightskins.lunareclipse.studio/skin-render/walking/.${senderName}/face`
            })
        );
    }

    private async relayPlayerJoined(
        playerName: string,
    ) {
        await this.sendRequest(
            JSON.stringify({
                content: `${playerName} joined.`,
            })
        );
    }

    private async relayPlayerLeft(
        playerName: string,
    ) {
        await this.sendRequest(
            JSON.stringify({
                content: `${playerName} left.`,
            })
        );
    }
}