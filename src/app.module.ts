import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RoadmapsModule } from './roadmaps/roadmaps.module';
import { ProgressModule } from './progress/progress.module';
import { MilestoneModule } from './milestone/milestone.module';
import { ValidationsModule } from './validations/validations.module';
import { RecommandedCertificationsModule } from './recommanded-certifications/recommanded-certifications.module';
import { RecommandedCoursesModule } from './recommanded-courses/recommanded-courses.module';
import { TestQuizModule } from './test-quiz/test-quiz.module';
import { QuestionsModule } from './questions/questions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Roadmap } from './roadmaps/entities/roadmap.entity';
import { Progress } from './progress/entities/progress.entity';
import { Validation } from './validations/entities/validation.entity';
import { Milestone } from './milestone/entities/milestone.entity';
import { RecommandedCertification } from './recommanded-certifications/entities/recommanded-certification.entity';
import { RecommandedCourse } from './recommanded-courses/entities/recommanded-course.entity';
import { TestQuiz } from './test-quiz/entities/test-quiz.entity';
import { Question } from './questions/entities/question.entity';



@Module({
  imports: [UsersModule, RoadmapsModule, ProgressModule, MilestoneModule, ValidationsModule, RecommandedCertificationsModule, RecommandedCoursesModule, TestQuizModule, QuestionsModule
  ,TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'project',
    entities: [User,Roadmap,Progress,Validation,Milestone,RecommandedCertification,RecommandedCourse,TestQuiz,Question],
    synchronize: true,
    logging: true,
  })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
