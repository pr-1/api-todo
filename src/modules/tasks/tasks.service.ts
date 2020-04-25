import { Injectable } from '@nestjs/common';
import { Task } from '../../models/tasks.model';
import { CreateTaskDto } from '../../dto/create-task-dto';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Types } from "mongoose";

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private readonly taskModel: ReturnModelType<typeof Task>) {
  }
  private tasks: Task[] = [];

  async getTasks(): Promise<Task[] | null> {
    return await this.taskModel.find().exec();
  }

  async getTaskById(id: string): Promise<Task> {
    return await this.taskModel.findById(this.toObjectId(id)).exec();
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return await createdTask.save();
  }

  async deleteTask(id: string): Promise<any> {
    return await this.taskModel.deleteOne({_id: id}).exec();
  }

  async updateTask(id: string, updateTask: Partial<Task>): Promise<Task> {
    return await this.taskModel
      .findByIdAndUpdate(this.toObjectId(id), updateTask, { new: true })
      .exec();
  }

  private toObjectId(id: string): Types.ObjectId {
    return Types.ObjectId(id);
  }

}
