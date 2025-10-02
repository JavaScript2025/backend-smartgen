/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';
import { Usuario } from "../../usuario/entities/usuario.entity"

@Entity({ name: 'tb_empresas' })
export class Empresa {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 250, nullable: false })
  nome_empresa: string;

  @IsNotEmpty()
  @Column({ length: 500, nullable: false })
  localizacao: string;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  telefone_contato: string;

  @IsNotEmpty()
  @Column({ length: 250, nullable: false })
  instagram: string;

  @ManyToOne(() => Categoria, (categoria) => categoria.empresa, {
    onDelete: "CASCADE"
  })
  categoria: Categoria;

  @ManyToOne(() => Usuario, (usuario) => usuario.empresas, {
    onDelete: "CASCADE"
  })
  usuario: Usuario;
}
