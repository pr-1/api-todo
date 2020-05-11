import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from '../../models/tasks.model';
import { CreateTaskDto } from '../../dto/create-task-dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
export class TasksController {
  constructor(private service: TasksService) {
  }

  @Get()
  async getTasks(): Promise<{data: Task[]}> {
    Logger.log(`Get posts Api called`, 'Post Controller');
    this.service.getTasks().then(res => {
      console.log(res);
    })
    return {
      data: await this.service.getTasks(),
    };
  }
  @Get(':id')
  async getTasksById(@Param('id') id: string): Promise<Task> {
    return this.service.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() task: CreateTaskDto): Promise<Task> {

    return this.service.createTask(task);
  }

  @Put(':id')
  updateTask(@Param('id') id: string, @Body() body: Partial<Task>) {
    return this.service.updateTask(id, body);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<boolean> {
    return this.service.deleteTask(id);
  }
}
