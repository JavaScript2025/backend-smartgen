/* eslint-disable prettier/prettier */
import { InjectRepository } from "@nestjs/typeorm";
import { Empresa } from "../entities/empresa.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EmpresaService {
    constructor(
        @InjectRepository(Empresa)
    private empresaReposiory: Repository<Empresa>
    ) { }

    async findAll(): Promise<Empresa[]> {
        return await this.empresaReposiory.find();
    }
    
}