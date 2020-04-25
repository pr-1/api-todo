import { IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../models/tasks.model';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  status?: TaskStatus;
}