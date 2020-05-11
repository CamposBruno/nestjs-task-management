import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Tasks } from '../../dist/tasks/tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksStatusValidationPipe } from './pipes/tasks-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService : TasksService) {}

    @Get()
    getTasks(@Query(ValidationPipe) filterDto : GetTasksFilterDto) : Array<Tasks> {
        if (Object.keys(filterDto).length){
            return this.tasksService.getTasksWithFilter(filterDto)
        }

        return this.tasksService.getAllTasks() 
    }

    @Get('/:id')
    getTaskById(@Param('id') id : string): Tasks {
        return this.tasksService.getTaskById(id)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask( @Body() createTaskDto: CreateTaskDto) : Tasks {
        return this.tasksService.createTask(createTaskDto)
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id : string, 
        @Body('status', TasksStatusValidationPipe ) status : string
    ) : Tasks {
        return this.tasksService.updateTaskStatus(id, status)
    }

    @Delete('/:id')
    deleteTask(@Param('id') id : string): void {
        this.tasksService.deleteTask(id)
    }
}
 