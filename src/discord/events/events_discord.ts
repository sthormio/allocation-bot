
import { ArgsOf, CommandMessage } from '@typeit/discord';
import { Command, CommandNotFound, Discord, On } from '@typeit/discord/decorators';
import AllocationController from '../../controllers/allocation_controller';
import DayOffsController from '../../controllers/day_offs_controller';
import SharedController from '../../controllers/shared_controller';

@Discord("!")
abstract class AllocationBotEvents {

    allocationController = new AllocationController();
    dayOffsController = new DayOffsController();
    sharedController = new SharedController();

    @On("ready")
    onReady(): void {
        this.sharedController.onReady();
    }

    @On("disconnect")
    onDisconnect(): void {
        this.sharedController.onDisconnect();
    }

    @CommandNotFound()
    notFound(message: CommandMessage): void {
        this.sharedController.notFound(message);
    }

    @Command("projects")
    listProjects(message: CommandMessage): void {
        this.allocationController.listProjects(message);
    }

    @Command("help")
    helpCommand(message: CommandMessage): void {
        this.sharedController.helpCommand(message);
    }

    @Command("on")
    insertAllocation(message: CommandMessage): void {
        this.allocationController.insertAllocation(message);
    }

    @Command("off")
    insertDayOff(message: CommandMessage): void {
        this.dayOffsController.insertDayOffs(message);
    }

    @On('message')
    out(
        message: ArgsOf<"message">,
    ): void {
        this.sharedController.genericCommands(message);
    }
}