// src/tasks/tasks.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // Create Task
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    const task = this.tasksService.create(createTaskDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Task created successfully',
      data: task,
    };
  }

  // Get All Tasks
  @Get()
  findAll() {
    const tasks = this.tasksService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Tasks retrieved successfully',
      data: tasks,
    };
  }

  // Get Task by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    const task = this.tasksService.findOne(id);
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Task retrieved successfully',
      data: task,
    };
  }

  // Update Task
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: CreateTaskDto) {
    const updatedTask = this.tasksService.update(id, updateTaskDto);
    if (!updatedTask) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Task updated successfully',
      data: updatedTask,
    };
  }

  // Delete Task
  @Delete(':id')
  remove(@Param('id') id: string) {
    const deletedTask = this.tasksService.remove(id);
    if (!deletedTask) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Task deleted successfully',
      data: deletedTask,
    };
  }
}
