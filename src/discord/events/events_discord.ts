
import { CommandMessage } from '@typeit/discord';
import { Command, CommandNotFound, Discord, On } from '@typeit/discord/decorators';
import { MessageOptions } from 'discord.js';
import { openBrowser, closeBrowser, openNewAllocationPage } from '../../puppetter/puppetter';
import AllocationLogo from '../../utils/allocation_logo'
import AllocationBot from "../discord_connection"

@Discord("!")
abstract class AllocationBotEvents {
    @On("ready")
    async onReady() {
        await openBrowser()
        console.log("AllocationBot is Online ✅");
    }

    @On("disconnect")
    onDisconnect() {
        console.log("AllocationBot is Offline ❌")
        closeBrowser();
    }

    @CommandNotFound()
    notFound(message: CommandMessage) {
        if (message.author.bot) return;
        if (message.channel.type === "dm") return;
        message.reply("Este comando não foi encontrado 😓. Digite !help para ver os comandos disponíveis")
    }


    @Command("help")
    helpCommand(message: CommandMessage) {
        if (message.author.bot) return;
        if (message.channel.type === "dm") return;
        message.channel.send(AllocationLogo())
        message.channel.send(
            `📝 COMMANDS:
             ✅ !on + project + hours => Adicionar sua alocação
             ✅ !help => Descrição de todos os comandos
        `)
    }

    @Command("on")
    async insertAllocation(message: CommandMessage) {

        if (message.author.bot) return;
        if (message.channel.type === "dm") return;

        if (message.channel.name === "routines") {

            const content = message.content.split(" ")
            if (content.length <= 1) {
                message.reply("Informe o projeto e as horas (separadas por espaço) para adicionar sua alocação")
                return;
            }


            const data = {
                "username": message.author.username,
                "project": content[1],
                "hours": content[2],
            }

            try {
                await openNewAllocationPage(data)
                message.reply("Sua Alocaçao foi adicionada 👊🏽")

            } catch (e) {
                message.reply("Ocorreu um erro ao adicionar sua alocação 😓, tente novamente")
            }
        }
    }
}