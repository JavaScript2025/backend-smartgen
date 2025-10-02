/* eslint-disable prettier/prettier */
import { InjectRepository } from "@nestjs/typeorm";
import { Empresa } from "../entities/empresa.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { CategoriaService } from "../../categoria/services/categoria.service";

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa)
    private empresaRepository: Repository<Empresa>,
    private categoriaService: CategoriaService
  ) {}

  async findAll(): Promise<Empresa[]> {
    return await this.empresaRepository.find({
      relations: {
        categoria: true,
        usuario: true
      }
    });
  }

  async findById(id: number): Promise<Empresa> {
    const empresa = await this.empresaRepository.findOne({
      where: { 
        id 
      },
      relations: {
        categoria: true,
        usuario: true
      }
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
      relations: {
        categoria: true,
        usuario: true
      }
    });
  }
async create(empresa: Empresa): Promise<Empresa> {
    await this.categoriaService.findById(empresa.categoria.id)
    return await this.empresaRepository.save(empresa);
  }
  async update(empresa: Empresa): Promise<Empresa>{
    await this.findById (empresa.id)
    await this.categoriaService.findById(empresa.categoria.id)
    return await this.empresaRepository.save(empresa);
  }
  async delete (id: number): Promise<DeleteResult>{
    await this.findById(id)

    return await this.empresaRepository.delete(id)
  }

}