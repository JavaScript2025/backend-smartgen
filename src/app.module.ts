/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from './empresa/entities/empresa.entity';
import { EmpresaModule } from './empresa/empresa.module';
import { Categoria } from './categoria/entities/categoria.entity';
import { CategoriaModule } from './categoria/categoria.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_smartgen',
      entities: [Empresa, Categoria, Usuario],
      synchronize: true,
      logging: true,
    }),
    EmpresaModule,
    CategoriaModule,
    UsuarioModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
