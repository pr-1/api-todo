import { getModelForClass, prop } from '@typegoose/typegoose';
export enum TaskStatus {
  OPEN = "open",
  IN_PROGRESS = "in_progress",
  DONE = "done"
}
export class Task {
  @prop({unique: true})
  id: string;
  @prop({required: true, index: true})
  title: string;
  @prop({required: true})
  description: string;
  @prop({default: TaskStatus.OPEN})
  status: TaskStatus;
}

