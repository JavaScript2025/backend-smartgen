/* eslint-disable prettier/prettier */
import { InjectRepository } from "@nestjs/typeorm";
import { Empresa } from "../entities/empresa.entity";
import { ILike, Repository } from "typeorm";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,
  ) {}

  async findAll(): Promise<Empresa[]> {
    return await this.empresaRepository.find();
  }

  async findById(id: number): Promise<Empresa> {
    const empresa = await this.empresaRepository.findOne({
      where: { id },
    });

    if (!empresa) {
      throw new HttpException('Empresa não encontrada', HttpStatus.NOT_FOUND);
    }

    return empresa;
  }

  async findAllByNome_Empresa(nome_empresa: string): Promise<Empresa[]> {
    return await this.empresaRepository.find({
      where: { 
        nome_empresa: ILike(`%${nome_empresa}%`)

       },
    });
  }
async create(empresa: Empresa): Promise<Empresa> {
    return await this.empresaRepository.save(empresa);
  }
}