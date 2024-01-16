import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { RoadmapService } from '../roadmaps/roadmaps.service';

async function seedDatabase() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const roadmapService = app.get(RoadmapService);
  await roadmapService.seedRoadmaps();
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
