import { Client } from "@typeit/discord";

export default class AllocationBot {
    private static _client: Client;

    static get Client(): Client {
        return this._client;
    }

    static async start(): Promise<boolean> {
        try {
            this._client = new Client();

            await this._client.login(
                process.env.TOKEN || "TOKEN",
                `${__dirname}/events/*.ts`,
                `${__dirname}/events/*.js`,
            );
            return true;
        } catch (error) {
            console.log(error)
            console.log("Error ao logar no discord bot ❌")
            return false;
        }
    }
}