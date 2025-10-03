import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Usuario } from '../entities/usuario.entity';
import { UsuarioService } from '../services/usuario.service';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  FindById(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this.usuarioService.findById(id);
  }

  @Get('buscar/:usuario')
  async findByUsuario(
    @Param('usuario') usuario: string,
  ): Promise<Usuario | null> {
    return await this.usuarioService.findByUsuario(usuario);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() usuario: Usuario): Promise<Usuario> {
    return this.usuarioService.create(usuario);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() usuario: Usuario): Promise<Usuario> {
    return this.usuarioService.update(usuario);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.delete(id);
  }

  @Get(':id/imc')
  async getImc(@Param('id', ParseIntPipe) id: number): Promise<object> {
    return this.usuarioService.calcularImc(id);
  }
}
