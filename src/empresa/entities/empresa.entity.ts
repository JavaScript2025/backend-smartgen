import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
