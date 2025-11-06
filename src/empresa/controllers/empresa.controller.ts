/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { EmpresaService } from "../services/empresa.service";
import { Empresa } from "../entities/empresa.entity";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Empresa')
@Controller("/empresas")
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Empresa[]> {
    return this.empresaService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: number): Promise<Empresa> {
    return this.empresaService.findById(id);
  }

  @Get('/nome_empresa/:nome_empresa')
  @HttpCode(HttpStatus.OK)
  findAllByNome_Empresa(@Param('nome_empresa') nome_empresa: string): Promise<Empresa[]> {
    return this.empresaService.findAllByNome_Empresa(nome_empresa);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() empresa: Empresa): Promise<Empresa> {
  return this.empresaService.create(empresa);
}

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() empresa: Empresa): Promise<Empresa> {
  return this.empresaService.update(empresa);
}

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe)id: number){
  return this.empresaService.delete(id);
}
}