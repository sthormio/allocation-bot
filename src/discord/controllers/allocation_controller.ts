import { CommandMessage } from "@typeit/discord";
import projects from "../../utils/projects";
import AllocationLogo from '../../utils/allocation_logo';
import { closeBrowser, openBrowser, openNewAllocationPage } from "../../puppetter/puppeteer";

export default class AllocationController {
    constructor() { }


    async onReady(): Promise<void> {
        await openBrowser()
        console.log("AllocationBot is Online ✅");
    }


    onDisconnect(): void {
        console.log("AllocationBot is Offline ❌")
        closeBrowser();
    }


    public notFound(message: CommandMessage): void {
        if (message.author.bot) return;
        if (message.channel.type === "dm") return;
        message.reply("Este comando não foi encontrado 😓. Digite !help para ver os comandos disponíveis")
    }


    public listProjects(message: CommandMessage) {
        if (message.author.bot) return;
        if (message.channel.type === "dm") return;

        message.channel.send(`Aqui estão os projetos disponíveis: 📝${projects.map(project => `\n${project}`)}`)

    }


    public helpCommand(message: CommandMessage): void {
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


    public async insertAllocation(message: CommandMessage): Promise<void> {

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



    private validateFieldsLenght(content: string[]): boolean {
        if ((content.length <= 1 || content.length <= 2) || content.length > 3) {
            return true;
        } else {
            return false;
        }
    }

    private validateProjects(content: string): boolean {
        if (!projects.includes(content)) {
            return true;
        } else {
            return false;
        }
    }

    private validateNumbersOfHours(content: string): boolean {
        if (Number(content) > 0 && Number(content) <= 8) {
            return false;
        } else {
            return true;
        }
    }

}