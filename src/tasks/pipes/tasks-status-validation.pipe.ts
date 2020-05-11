import { PipeTransform, BadRequestException } from "@nestjs/common"
import { TaskStatus } from '../task.model';

export class TasksStatusValidationPipe implements PipeTransform {
    readonly allowedStatus : Array<string> = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ]

    transform(value : any) {
        value = value.toUpperCase()

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`Status value "${value}" is invalid`)
        }

        return value
    }

    private isStatusValid(status : any) {
        if (this.allowedStatus.indexOf(status)  === -1 ) {
            return false
        }

        return true
    }
}