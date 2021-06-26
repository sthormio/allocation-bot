import { CommandMessage } from "@typeit/discord";
import projects from "../utils/projects";
import { InsertAllocation } from '../spreadsheet/spreadsheet_actions';
import { usersAllocation } from "../utils/users";
import { GuildMember } from "discord.js";
import { useSplitWhenHasFlags } from "../utils/functions";

export default class AllocationController {
    constructor() { }

    public listProjects(message: CommandMessage) {
        if (message.author.bot) return;
        if (message.channel.type === "dm") return;

        message.channel.send(`Aqui estão os projetos disponíveis: 📝${projects.map(project => `\n${project}`)}`)

    }

    public async insertAllocation(message: CommandMessage): Promise<void> {

        if (message.author.bot) return;
        if (message.channel.type === "dm") return;

        if (message.channel.name === "routines") {

            const [content, FlagContent] = useSplitWhenHasFlags(message.content, "--obs");

            if (this.validateFieldsLength(content as string[])) {
                message.reply("Informe o projeto e as horas (separadas por espaço) para adicionar sua alocação. Ex: !on Artbit 8")
                return;
            }

            if (this.validateProjects(content[0])) {
                message.reply(`Escolha um dos projetos listados: 📝${projects.map(project => `\n${project}`)}`)
                return;
            }

            if (this.validateNumbersOfHours(content[1])) {
                message.reply("Informe o números de horas entre 1 e 8")
                return;
            }

            let member = message.guild?.member(message.author);

            console.log(member?.displayName);

            console.log(member?.displayName);

            const data = {
                "username": member?.displayName as string,
                "project": content[0],
                "hours": content[1],
                "obs": FlagContent == null ? false : (FlagContent as string).trim(),
            }

            try {

                message.reply("Estou adicionando sua alocação, por favor aguarde... ⏳")

                await InsertAllocation(data)

                message.reply("Sua Alocação foi adicionada 👊🏽")

                this.addToAllocatedUsers(member);

                console.log(usersAllocation.usersAllocated)

            } catch (e) {
                console.log(e)

                message.reply("Ocorreu um erro ao adicionar sua alocação 😓, poderia tentar novamente ?")
            }
        }
    }

    private validateFieldsLength(content: string[]): boolean {
        if ((content.length == 2)) {
            return false;
        } else {
            return true;
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

    private addToAllocatedUsers(member: GuildMember | null | undefined) {
        const hasAlreadyExists = usersAllocation.usersAllocated.find(user => user.id == member?.id);
        if (hasAlreadyExists) {
            return;
        }
        usersAllocation.usersAllocated.push({
            id: member?.id as string,
            name: member?.displayName as string,
        })
    }
}