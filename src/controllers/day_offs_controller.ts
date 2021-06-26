import { CommandMessage } from "@typeit/discord";
import { InsertDayOff } from '../spreadsheet/spreadsheet_actions';
import { useSplitWhenHasFlags } from '../utils/functions';


export default class DayOffsController {
    constructor() { }


    public async insertDayOffs(message: CommandMessage): Promise<void> {
        if (message.author.bot) return;
        if (message.channel.type === "dm") return;

        if (message.channel.name === "routines") {
            let member = message.guild?.member(message.author);

            const [content, FlagContent] = useSplitWhenHasFlags(message.content, "--desc");


            console.log(`content: ${content}`)
            console.log(`FlagContent: ${FlagContent}`)

            if (this.validateLengthFieldsDayOf(content as string[])) {
                message.reply('Informe o seguinte paramentros para adicionar seu saldo de day offs: !off + "1 ou -1" + Data (YYYY/MM/DD => opcional) + --desc (descrição => opcional)')
                return;
            }


            if (this.validateAmountDayOff(content as string[])) {
                message.reply("Informe apenas a quantidade a ser adicionada ou retirada com valores '1' ou '-1'")
                return;
            }

            if (content[1] != null && this.validateDateFormat(content[1])) {
                message.reply("Infome a data para sua folga no seguinte formato YYYY-MM-DD");
                return;
            }

            const data = {
                username: member?.displayName as string,
                amount: Number(content[0]),
                date: content[1],
                description: FlagContent as string
            }

            try {

                message.reply("Estou adicionando seu dia de folga, por favor aguarde... ⏳")

                await InsertDayOff(data)

                message.reply("Seu dia de folga foi adicionado 🏖")

            } catch (e) {
                console.log(e)

                message.reply("Ocorreu um erro ao adicionar sua folga 😓, poderia tentar novamente ?")
            }


        }
    }


    private validateLengthFieldsDayOf(content: string[]) {
        if (content.length == 0) {
            return true;
        } else {
            return false;
        }
    }

    private validateAmountDayOff(content: string[]): boolean {
        if (Number(content[0]) == 1 || Number(content[0]) == -1) {
            return false;
        } else {
            return true;
        }
    }

    private validateDateFormat(content: string): boolean {
        const pattern = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
        const regexDate = new RegExp(pattern)
        return !regexDate.test(content.trim());
    }


}