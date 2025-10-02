import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from './empresa/entities/empresa.entity';
import { EmpresaModule } from './empresa/empresa.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_smartgen',
      entities: [Empresa],
      synchronize: true,
      logging: true,
    }),
    EmpresaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
