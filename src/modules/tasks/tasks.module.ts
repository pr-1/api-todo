import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Task } from '../../models/tasks.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypegooseModule.forFeature([Task]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
