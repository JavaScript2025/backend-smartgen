/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresaModule } from './empresa/empresa.module';
import { CategoriaModule } from './categoria/categoria.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AppController } from './app.controller';
import { ProdService } from './data/services/prod.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
TypeOrmModule.forRootAsync({
	useClass: ProdService,
    imports: [ConfigModule],
}),
    EmpresaModule,
    CategoriaModule,
    UsuarioModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
