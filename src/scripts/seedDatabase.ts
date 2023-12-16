import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { TestQuizService } from '../test-quiz/test-quiz.service';
import * as fs from 'fs';
import * as path from 'path';

async function seedDatabase() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const testQuizService = app.get(TestQuizService);

  // Chemin vers le fichier JSON
  const filePath = path.join(__dirname, '../../data/machine_learning_questions.json');

  // Lecture du fichier JSON
  const questionsData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Créer un quiz pour Machine Learning (ou récupérer s'il existe déjà)
  const quiz = await testQuizService.createQuizIfNotExists('Machine Learning');

  // Ajouter les questions au quiz
  for (const questionData of questionsData) {
    const optionsAsString = questionData.options.join(","); // Concatène les options
    const modifiedQuestionData = {
      ...questionData,
      options: optionsAsString,
    };
    await testQuizService.addQuestionToQuiz(quiz, modifiedQuestionData);
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
