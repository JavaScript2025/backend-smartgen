/* eslint-disable prettier/prettier */
import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { EmpresaService } from "../services/empresa.service";
import { Empresa } from "../entities/empresa.entity";

@Controller("/empresas")
export class EmpresaController {
    constructor(private readonly empresaService: EmpresaService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Empresa[]>{
        return this.empresaService.findAll();
    }
}