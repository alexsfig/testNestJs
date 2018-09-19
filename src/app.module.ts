import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Routes, RouterModule } from 'nest-router';
import { Connection } from 'typeorm';
import { CatModule } from './cat/cat.module';
import { UserModule } from './user/user.module';

const routes: Routes = [
  {
    path: '/api/v1/users',
    module: UserModule,
    children: [
      {
        path: '/cats',
        module: CatModule,

      },
    ],
  },

];
@Module({
  imports: [
    RouterModule.forRoutes(routes),
    TypeOrmModule.forRoot(),
    CatModule,
    UserModule,
    // AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
   constructor(private readonly connection: Connection) {}
}
