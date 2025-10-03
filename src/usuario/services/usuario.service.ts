/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
    ) { }

    async findByUsuario(usuario: string): Promise<Usuario |null> {
        return await this.usuarioRepository.findOne({
            where: {
                usuario: usuario
            }
        })
    }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find();

    }

    async findById(id: number): Promise<Usuario> {

        const usuario = await this.usuarioRepository.findOne({
            where: {
                id
            }
        });

        if (!usuario)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

        return usuario;

    }

    async create(usuario: Usuario): Promise<Usuario> {
        const buscaUsuario = await this.findByUsuario(usuario.usuario);
    
        if (buscaUsuario) {
            throw new HttpException("O Usuário já existe!", HttpStatus.BAD_REQUEST);
        }
    
        const novoUsuario = await this.usuarioRepository.save(usuario);
    
        return novoUsuario; 
    }
    
    async update(usuario: Usuario): Promise<Usuario> {
        await this.findById(usuario.id);
    
        const buscaUsuario = await this.findByUsuario(usuario.usuario);
    
        if (buscaUsuario && buscaUsuario.id !== usuario.id) {
            throw new HttpException('Usuário (e-mail) já cadastrado!', HttpStatus.BAD_REQUEST);
        }
    
        const usuarioAtualizado = await this.usuarioRepository.save(usuario);
    
        return usuarioAtualizado; 
    }
    
}