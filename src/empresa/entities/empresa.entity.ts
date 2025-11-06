/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {ApiProperty} from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';
import { Usuario } from "../../usuario/entities/usuario.entity"

@Entity({ name: 'tb_empresas' })
export class Empresa {

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ length: 250, nullable: false })
  nome_empresa: string;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ length: 500, nullable: false })
  localizacao: string;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  telefone_contato: string;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ length: 250, nullable: false })
  instagram: string;

  @ApiProperty({type: ()=> Categoria})
  @ManyToOne(() => Categoria, (categoria) => categoria.empresa, {
    onDelete: "CASCADE"
  })
  categoria: Categoria;

  @ApiProperty({type: ()=> Usuario})
  @ManyToOne(() => Usuario, (usuario) => usuario.empresa, {
    onDelete: "CASCADE"
  })
  usuario: Usuario;
}
