import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Routes, RouterModule } from 'nest-router';
import { Connection } from 'typeorm';
import { CatsModule } from './cats/cats.module';
// import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserService } from './user.service';


const routes: Routes = [
  {
    path: '/api/v1',
    module: CatsModule,

  },
];
@Module({
  imports: [
    RouterModule.forRoutes(routes),
    TypeOrmModule.forRoot(),
    CatsModule,
    UserModule,
    // AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {
   constructor(private readonly connection: Connection) {}
}
