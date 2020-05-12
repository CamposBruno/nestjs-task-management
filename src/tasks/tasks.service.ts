import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ){}

    public getTasks(filterDto: GetTasksFilterDto) : Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto)
    }

    public async getTaskById(id: number) : Promise<Task> {
        const found = await this.taskRepository.findOne(id)

        if (!found) {
            throw new NotFoundException(`Task with id ${id} not found`)
        }

        return found
    }
    

    public createTask(createTaskDto : CreateTaskDto) : Promise<Task> {
       return this.taskRepository.createTask(createTaskDto)
    }

    public async updateTaskStatus(id: number, status : TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id)
        task.status = status
        await task.save()

        return task        
    }

    public async deleteTask(id : number): Promise<void> {
        const { affected } = await this.taskRepository.delete(id)

        if (affected === 0) {
            throw new NotFoundException(`Task with id ${id} not found`)
        }
    }
}
