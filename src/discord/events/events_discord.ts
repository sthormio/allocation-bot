
import { CommandMessage } from '@typeit/discord';
import { Command, CommandNotFound, Discord, On } from '@typeit/discord/decorators';
import { openBrowser, closeBrowser, openNewAllocationPage, browser } from '../../puppetter/puppeteer';
import AllocationLogo from '../../utils/allocation_logo';
import projects from '../../utils/projects';


@Discord("!")
abstract class AllocationBotEvents {
    @On("ready")
    async onReady(): Promise<void> {
        await openBrowser()
        console.log("AllocationBot is Online ✅");
    }

    @On("disconnect")
    onDisconnect(): void {
        console.log("AllocationBot is Offline ❌")
        closeBrowser();
    }

    @CommandNotFound()
    notFound(message: CommandMessage): void {
        if (message.author.bot) return;
        if (message.channel.type === "dm") return;
        message.reply("Este comando não foi encontrado 😓. Digite !help para ver os comandos disponíveis")
    }


    @Command("projects")
    listProjects(message: CommandMessage) {
        if (message.author.bot) return;
        if (message.channel.type === "dm") return;

        message.channel.send(`Aqui estão os projetos disponíveis: 📝${projects.map(project => `\n${project}`)}`)

    }

    @Command("help")
    helpCommand(message: CommandMessage): void {
        if (message.author.bot) return;
        if (message.channel.type === "dm") return;
        message.channel.send(AllocationLogo())
        message.channel.send(
            `📝 COMMANDS:
             ✅ !on + project + hours => Adicionar sua alocação
             ✅ !projects => Listar todos os projetos para alocação
             ✅ !help => Descrição de todos os comandos

        `)
    }

    @Command("on")
    async insertAllocation(message: CommandMessage): Promise<void> {

        if (message.author.bot) return;
        if (message.channel.type === "dm") return;

        if (message.channel.name === "routines") {

            const content = message.content.split(" ")

            if (this.validateFieldsLenght(content)) {
                message.reply("Informe o projeto e as horas (separadas por espaço) para adicionar sua alocação. Ex: !on Artbit 8")
                return;
            }

            if (this.validateProjects(content[1])) {
                message.reply(`Escolha um dos projetos listados: 📝${projects.map(project => `\n${project}`)}`)
                return;
            }

            if (this.validateNumbersOfHours(content[2])) {
                message.reply("Informe o números de horas entre 1 e 8")
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

    validateFieldsLenght(content: string[]): boolean {
        if ((content.length <= 1 || content.length <= 2) || content.length > 3) {
            return true;
        } else {
            return false;
        }
    }

    validateProjects(content: string): boolean {
        if (!projects.includes(content)) {
            return true;
        } else {
            return false;
        }
    }

    validateNumbersOfHours(content: string): boolean {
        if (Number(content) > 0 && Number(content) <= 8) {
            return false;
        } else {
            return true;
        }
    }


}