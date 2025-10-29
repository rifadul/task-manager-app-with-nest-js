// src/tasks/tasks.service.ts
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.interface';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  create(createTaskDto: CreateTaskDto) {
    const task = {
      id: Date.now().toString(),
      ...createTaskDto,
    };
    this.tasks.push(task);
    return task;
  }

  findAll() {
    return this.tasks;
  }

  findOne(id: string) {
    return this.tasks.find((task) => task?.id === id);
  }

  update(id: string, updateTaskDto: CreateTaskDto) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex > -1) {
      this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updateTaskDto };
      return this.tasks[taskIndex];
    }
    return null;
  }

  remove(id: string) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex > -1) {
      const deletedTask = this.tasks.splice(taskIndex, 1);
      return deletedTask[0];
    }
    return null;
  }
}
