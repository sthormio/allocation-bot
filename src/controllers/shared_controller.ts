import allocationLogoMobile from '../utils/allocation_logo';
import { closeBrowser } from "../puppetter/puppeteer";
import { ArgsOf, CommandMessage } from "@typeit/discord";


export default class SharedController {
    constructor() {

    }

    async onReady(): Promise<void> {
        // await openBrowser()
        console.log("AllocationBot is Online ✅");
    }

    onDisconnect(): void {
        console.log("AllocationBot is Offline ❌")
        closeBrowser();
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

    public notFound(message: CommandMessage): void {
        if (message.author.bot) return;
        if (message.channel.type === "dm") return;
        message.reply("Este comando não foi encontrado 😓. Digite !help para ver os comandos disponíveis")
    }


    public helpCommand(message: CommandMessage): void {
        if (message.author.bot) return;
        if (message.channel.type === "dm") return;
        message.channel.send(allocationLogoMobile())
        message.channel.send(
            `📝 COMMANDS:
             ✅ !on + project + hours + --obs (descrição => opcional) => Adicionar sua alocação
             ✅ !projects => Listar todos os projetos para alocação
             ✅ !help => Descrição de todos os comandos
             ✅ !off + "1 ou -1" + Data (YYYY/MM/DD => opcional) + --desc (descrição => opcional)=> Adicionar day offs para você 
        `)
    }
}