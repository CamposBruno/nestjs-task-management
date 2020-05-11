import { TaskStatus } from '../task.model';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class GetTasksFilterDto {
    @IsOptional()
    @IsIn(Object.keys(TaskStatus))
    status : TaskStatus

    @IsOptional()
    @IsNotEmpty()
    search : string
}