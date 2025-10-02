/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm";
import { Categoria } from "../entities/categoria.entity";
import { ILike, Repository } from "typeorm";
import { DeleteResult } from "typeorm";




@Injectable()
export class CategoriaService {
    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>
    ) {}

async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
        relations: {
            empresa: true
        }
    });
}

async findById(id: number): Promise<Categoria> {

    const categoria = await this.categoriaRepository.findOne({
        where: {
            id
        },
        relations: {
            empresa: true
        }
    });

    if (!categoria)
        throw new HttpException('Categoria não encontrado!', HttpStatus.NOT_FOUND);

    return categoria;
}

async findAllByTipo_servico(tipo_servico: string): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
        where: {
            tipo_servico: ILike(`%${tipo_servico}%`)
        },
        relations: {
            empresa: true
        }
    })
}

async create(Categoria: Categoria): Promise<Categoria> {
    return await this.categoriaRepository.save(Categoria);
}

async update(categoria: Categoria): Promise<Categoria> {

    await this.findById(categoria.id);

    return await this.categoriaRepository.save(categoria);
}

async delete(id: number): Promise<DeleteResult> {

    await this.findById(id);

    return await this.categoriaRepository.delete(id);
}
}