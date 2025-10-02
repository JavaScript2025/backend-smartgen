/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Empresa } from "../../empresa/entities/empresa.entity";

@Entity({name: "tb_categorias"})
export class Categoria {

    @PrimaryGeneratedColumn()    
    id: number

    @IsNotEmpty()
    @Column({length: 300, nullable: false})
    tipo_servico: string

    @OneToMany(()=> Empresa, (empresa)=> empresa.categoria)
    empresa: Empresa[]
    
}