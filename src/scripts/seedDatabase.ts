import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { TestQuizService } from '../test-quiz/test-quiz.service';
import * as fs from 'fs';
import * as path from 'path';
import { RoadmapService } from '../roadmaps/roadmaps.service';
import { QuestionsService } from '../questions/questions.service';
import { MilestoneService } from '../milestone/milestone.service';

async function seedDatabase() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const roadmapService = app.get(RoadmapService);
  await roadmapService.seedRoadmaps();
  const testQuizService = app.get(TestQuizService);
  await testQuizService.seedTestQuizzes();
  
  const questionsService = app.get(QuestionsService);
  
  await questionsService.seedQuestions();
  const milestoneservice=app.get(MilestoneService)
  await milestoneservice.seedMilestones()
  
  console.log('Seeding completed!');
  await app.close();
}

async function bootstrap() {
  try {
    await seedDatabase();
  } catch (error) {
    console.error('Seeding failed', error);
  }
}

bootstrap();
