/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from './empresa/entities/empresa.entity';
import { EmpresaModule } from './empresa/empresa.module';
import { Categoria } from './categoria/entities/categoria.entity';
import { CategoriaModule } from './categoria/categoria.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_smartgen',
      entities: [Empresa, Categoria],
      synchronize: true,
      logging: true,
    }),
    EmpresaModule,
    CategoriaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
