import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
    
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ){}

    public getTasks(filterDto: GetTasksFilterDto, user: User) : Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto, user)
    }

    public async getTaskById(id: number, user: User) : Promise<Task> {
        const found = await this.taskRepository.findOne({ id, user })

        if (!found) {
            throw new NotFoundException(`Task with id ${id} not found`)
        }

        return found
    }
    

    public createTask(createTaskDto : CreateTaskDto, user: User) : Promise<Task> {
       return this.taskRepository.createTask(createTaskDto, user)
    }

    public async updateTaskStatus(id: number, status : TaskStatus, user: User): Promise<Task> {
        const task = await this.getTaskById(id, user)
        task.status = status
        await task.save()

        return task        
    }

    public async deleteTask(id : number, user: User): Promise<void> {
        const { affected } = await this.taskRepository.delete({ id, user })

        if (affected === 0) {
            throw new NotFoundException(`Task with id ${id} not found`)
        }
    }
}
