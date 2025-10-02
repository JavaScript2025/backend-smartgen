/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { EmpresaService } from "../services/empresa.service";
import { Empresa } from "../entities/empresa.entity";

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
}