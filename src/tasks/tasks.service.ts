import { Injectable, NotFoundException } from '@nestjs/common';
import { Tasks, TaskStatus } from './task.model';
import * as uuid from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks : Array<Tasks> = []

    public getAllTasks() : Array<Tasks> {
        return this.tasks
    }

    public getTasksWithFilter(filterDto: GetTasksFilterDto): Array<Tasks> {
        const { status, search } = filterDto

        let tasks = this.getAllTasks()

        if(status) {
            tasks = tasks.filter(task => task.status === status)
        }

        if(search) {
            tasks = tasks.filter(task => 
                task.title.includes(search) ||
                task.description.includes(search)
            )
        }

        return tasks
    }

    public getTaskById(id : string) : Tasks {
        const found =  this.tasks.find(task => task.id === id)

        if (!found) {
            throw new NotFoundException(`Task with id ${id} not found`)
        }

        return found
    }

    public createTask(createTaskDto : CreateTaskDto) : Tasks {
        const {title, description} = createTaskDto

        const task : Tasks = {
            id : uuid.v1(),
            title,
            description,
            status : TaskStatus.OPEN
        }

        this.tasks.push(task)

        return task
    }

    public updateTaskStatus(id: string, status : string): Tasks {
        const task: Tasks = this.getTaskById(id)

        task.status = TaskStatus[status]

        return task
        
    }

    public deleteTask(id : string): void {
        const found = this.getTaskById(id)
        this.tasks = this.tasks.filter((task: Tasks) => {
            return task.id !== found.id
        })
    }
}
