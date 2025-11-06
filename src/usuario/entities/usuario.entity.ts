/* eslint-disable prettier/prettier */
import {ApiProperty} from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Empresa } from '../../empresa/entities/empresa.entity';

@Entity({ name: 'tb_usuarios' })
export class Usuario {

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  nome: string;

  @IsEmail()
  @Column({ length: 255, nullable: false })
  @ApiProperty({example: "email@email.com.br"})
  usuario: string;

  @IsNotEmpty()
  @MinLength(8)
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  senha: string;

  @Column({ length: 5000 })
  @ApiProperty()
  foto: string;

  @Column({ type: 'float' })
  @ApiProperty()
  altura: number;

  @Column({ type: 'float' })
  @ApiProperty()
  peso: number;

  @ApiProperty()
  @OneToMany(() => Empresa, (empresa) => empresa.usuario)
  empresa: Empresa[];
}
