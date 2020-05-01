import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { TasksModule } from './modules/tasks/tasks.module';
import { AuthModule } from './modules/auth/auth.module';
const dbUrl = 'mongodb+srv://blog-app-admin:qwerty1234@cluster0-cb4pe.mongodb.net/test?retryWrites=true&w=majority';
@Module({
  imports: [
    TypegooseModule.forRoot(dbUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    }),
    TasksModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
