/* eslint-disable prettier/prettier */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async findByUsuario(usuario: string): Promise<Usuario | null> {
    return await this.usuarioRepository.findOne({
      where: {
        usuario: ILike(`%${usuario}%`),
      },
    });
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }

  async findById(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: {
        id,
      },
    });

    if (!usuario)
      throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);

    return usuario;
  }

  async create(usuario: Usuario): Promise<Usuario> {
    const buscaUsuario = await this.findByUsuario(usuario.usuario);

    if (buscaUsuario) {
      throw new HttpException('O Usuário já existe!', HttpStatus.BAD_REQUEST);
    }

    const novoUsuario = await this.usuarioRepository.save(usuario);

    return novoUsuario;
  }

  async update(usuario: Usuario): Promise<Usuario> {
    await this.findById(usuario.id);

    const buscaUsuario = await this.findByUsuario(usuario.usuario);

    if (buscaUsuario && buscaUsuario.id !== usuario.id) {
      throw new HttpException(
        'Usuário (e-mail) já cadastrado!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const usuarioAtualizado = await this.usuarioRepository.save(usuario);

    return usuarioAtualizado;
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.usuarioRepository.delete(id);
  }

  async calcularImc(id: number): Promise<object> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });

    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }

    if (!usuario.altura || !usuario.peso || usuario.altura === 0) {
      throw new NotFoundException(
        `Altura e/ou Peso não cadastrados para este usuário.`,
      );
    }

    const imc = usuario.peso / (usuario.altura * usuario.altura);

    let classificacao = '';
    if (imc < 18.5) classificacao = 'Abaixo do peso';
    else if (imc < 24.9) classificacao = 'Peso normal';
    else if (imc < 29.9) classificacao = 'Sobrepeso';
    else classificacao = 'Obesidade';

    return {
      nome: usuario.nome,
      imc: parseFloat(imc.toFixed(2)), // Arredonda para 2 casas decimais
      classificacao: classificacao,
    };
  }
}
