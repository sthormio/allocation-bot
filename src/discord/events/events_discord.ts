
import { ArgsOf, CommandMessage } from '@typeit/discord';
import { Command, CommandNotFound, Discord, On } from '@typeit/discord/decorators';
import { openBrowser, closeBrowser, } from '../../puppetter/puppeteer';
import AllocationLogo from '../../utils/allocation_logo';
import projects from '../../utils/projects';
import AllocationController from '../controllers/allocation_controller'

@Discord("!")
abstract class AllocationBotEvents {

    allocationController = new AllocationController()

    @On("ready")
    onReady(): void {
        this.allocationController.onReady();
        openBrowser()
    }

    @On("disconnect")
    onDisconnect(): void {
        this.allocationController.onDisconnect();
    }

    @CommandNotFound()
    notFound(message: CommandMessage): void {
        this.allocationController.notFound(message);
    }

    @Command("projects")
    listProjects(message: CommandMessage): void {
        this.allocationController.listProjects(message);
    }

    @Command("help")
    helpCommand(message: CommandMessage): void {
        this.allocationController.helpCommand(message);
    }

    @Command("on")
    insertAllocation(message: CommandMessage): void {
        this.allocationController.insertAllocation(message);
    }

    @On('message')
    out(
        message: ArgsOf<"message">,
    ): void {
        this.allocationController.genericCommands(message);
    }
}