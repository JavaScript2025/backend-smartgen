import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from './entities/empresa.entity';
import { EmpresaService } from './services/empresa.service';
import { EmpresaController } from './controllers/empresa.controller';
import { CategoriaModule } from '../categoria/categoria.module';

@Module({
  imports: [TypeOrmModule.forFeature([Empresa]), CategoriaModule],
  providers: [EmpresaService],
  controllers: [EmpresaController],
  exports: [],
})
export class EmpresaModule {}
