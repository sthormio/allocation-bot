import { Client } from "@typeit/discord";

export default class AllocationBot {
    private static _client: Client;

    static get Client(): Client {
        return this._client;
    }

    static start(): void {
        this._client = new Client();

        this._client.login(
            process.env.TOKEN || "TOKEN",
            `${__dirname}/events/*.ts`,
            `${__dirname}/events/*.js`,
        );
    }
}