import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsController } from './cats.controller';
import { Cats } from './cats.entity';
import { CatsService } from './cats.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cats])],
  providers: [CatsService],
  controllers: [CatsController],
})
export class CatsModule {}