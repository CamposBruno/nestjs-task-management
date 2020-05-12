import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksStatusValidationPipe } from './pipes/tasks-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService : TasksService) {}

    @Get()
    getTasks(@Query(ValidationPipe) filterDto : GetTasksFilterDto): Promise<Task[]> {        
        return this.tasksService.getTasks(filterDto)
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id : number): Promise<Task> {
        return this.tasksService.getTaskById(id)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask( @Body() createTaskDto: CreateTaskDto) : Promise<Task> {
        return this.tasksService.createTask(createTaskDto)
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id', ParseIntPipe) id : number, 
        @Body('status', TasksStatusValidationPipe ) status : TaskStatus
    ) : Promise<Task> {
        return this.tasksService.updateTaskStatus(id, status)
    }

    @Delete('/:id')
    removeTask(@Param('id', ParseIntPipe) id : number): Promise<void> {
        return this.tasksService.deleteTask(id)
    }
}
 