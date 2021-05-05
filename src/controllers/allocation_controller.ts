import { ArgsOf, CommandMessage } from "@typeit/discord";
import projects from "../utils/projects";
import allocationLogoMobile from '../utils/allocation_logo';
import { closeBrowser } from "../puppetter/puppeteer";
import { InsertAllocation } from '../spreadsheet/spreadshet_actions';
import { checkAlocation } from "../utils/users";

export default class AllocationController {
    constructor() { }


    async onReady(): Promise<void> {
        // await openBrowser()
        console.log("AllocationBot is Online ✅");
    }

    genericCommands(
        message: ArgsOf<"message">,
    ) {
        if (message[0].author.bot) return;
        if (message[0].channel.type === "dm") return;

        if (message[0].channel.name === 'routines') {

            if (message[0].content == 'out' || message[0].content == 'Out') {
                const date = new Date()
                if (date.getDay() === 5) {
                    message[0].reply("Tenha um bom fim de semana, nos vemos na segunda 👋🏽")
                } else {
                    message[0].reply("Tenha um bom descanso, nos vemos amanhã 👋🏽")
                }
            } else if (message[0].content == 'back' || message[0].content == 'Back') {
                message[0].reply("Bem vindo de volta ao trabalho 👊🏼")
            } else if (message[0].content == 'almoço' || message[0].content == 'Almoço') {
                message[0].reply("Comer é bom né? 🍛 Vai lá recarregar as baterias")
            }
        }

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
        message.channel.send(allocationLogoMobile())
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


            const rawContent = message.content.split("--obs")
            const content = rawContent[0].split(" ")

            if (message.content.includes('--obs')) {
                content.pop();
            }


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

            let member = message.guild?.member(message.author);


            console.log(member?.displayName);


            const data = {
                "username": member?.displayName as string,
                "project": content[1],
                "hours": content[2],
                "obs": rawContent.length === 2 ? rawContent[1].trim() : false,
            }

            try {

                message.reply("Estou adicionando sua alocação, por favor aguarde... ⏳")

                await InsertAllocation(data)

                message.reply("Sua Alocação foi adicionada 👊🏽")

                if (checkAlocation.usersAlocated.length == 0) {
                    checkAlocation.usersAlocated.push({
                        id: member?.id as string,
                        name: member?.displayName as string,
                    })
                } else {
                    checkAlocation.usersAlocated.forEach(user => {
                        if (user?.id != member?.id) {
                            checkAlocation.usersAlocated.push({
                                id: member?.id as string,
                                name: member?.displayName as string,
                            })
                        }
                    })
                }

                console.log(checkAlocation.usersAlocated)

            } catch (e) {
                console.log(e)

                message.reply("Ocorreu um erro ao adicionar sua alocação 😓, poderia tentar novamente ?")
            }
        }


    }



    private validateFieldsLenght(content: string[]): boolean {
        if ((content.length <= 1 || content.length <= 2)) {
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