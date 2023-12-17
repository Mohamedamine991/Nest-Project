import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { TestQuizService } from '../test-quiz/test-quiz.service';
import * as fs from 'fs';
import * as path from 'path';

async function seedDatabase() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const testQuizService = app.get(TestQuizService);

  const domainFiles = [
    { title: 'Machine Learning', file: 'machine_learning_questions.json' },
    { title: 'Security', file: 'security_questions.json' },
    { title: 'DevOps', file: 'devops_questions.json' },
    { title: 'Network', file: 'network_questions.json' }
  ];

  for (const domain of domainFiles) {
    const filePath = path.join(__dirname, `../../data/${domain.file}`);
    const questionsData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const quiz = await testQuizService.createQuizIfNotExists(domain.title);

    for (const questionData of questionsData) {
      const optionsAsString = questionData.options.join(",");
      const modifiedQuestionData = { ...questionData, options: optionsAsString };
      await testQuizService.addQuestionToQuiz(quiz, modifiedQuestionData);
    }
  }

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
